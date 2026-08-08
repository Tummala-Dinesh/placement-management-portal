import jwt from "jsonwebtoken";
import env from "dotenv";
import bcrypt from "bcrypt";
import transporter from "../config/mail.js";
import { generateOTP } from "../utils/otp.js";
import db from "../config/db.js";

env.config();

const COLLEGE_DOMAIN = "@student.nitw.ac.in";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // --- NEW: Domain Check for Production direct-registration ---
    if (!email.endsWith(COLLEGE_DOMAIN)) {
      return res.status(400).json({
        message: `Only ${COLLEGE_DOMAIN} email addresses are allowed.`,
      });
    }

    const existingUser = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
      `
      INSERT INTO users(email, password_hash, role)
      VALUES($1, $2, 'student')
      RETURNING id, email, role
      `,
      [email, hashedPassword]
    );

    const user = result.rows[0];

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(201).json({
      message: "User registered successfully",
      user,
      token,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Registration failed",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      role:user.role,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Login failed",
    });
  }
};

export const getMe = async (req, res) => {
  res.status(200).json({
    user: req.user,
  });
};

export const sendOTP = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // --- NEW: Domain Check for Local OTP registration ---
    if (!email.endsWith(COLLEGE_DOMAIN)) {
      return res.status(400).json({
        message: `Only ${COLLEGE_DOMAIN} email addresses are allowed.`,
      });
    }

    // Generate OTP
    const otp = generateOTP();
    
    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Hash OTP
    const otpHash = await bcrypt.hash(otp, 10);

    // OTP expires in 5 minutes
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Store temporary registration data
    await db.query(
      `
      INSERT INTO email_verifications
        (email, password_hash, otp_hash, expires_at, attempts)
      VALUES ($1, $2, $3, $4, 0)
      ON CONFLICT (email)
      DO UPDATE SET
        password_hash = EXCLUDED.password_hash,
        otp_hash = EXCLUDED.otp_hash,
        expires_at = EXCLUDED.expires_at,
        attempts = 0
      `,
      [email, passwordHash, otpHash, expiresAt]
    );

    // --- NEW: Environment Toggle ---
    if (process.env.NODE_ENV === "production") {
      console.log(`[DEMO MODE] Skipped real email. OTP for ${email}: ${otp}`);
    } else {
      // Send OTP email in local development
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "College Portal - Email Verification",
        text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
      });
    }

    return res.status(200).json({
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.error("Send OTP error:", error);

    return res.status(500).json({
      message: "Failed to send OTP",
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    // Find the pending verification
    const result = await db.query(
      `
      SELECT *
      FROM email_verifications
      WHERE email = $1
      `,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "No verification request found",
      });
    }

    const verification = result.rows[0];

    // Check whether OTP has expired
    if (new Date() > new Date(verification.expires_at)) {
      await db.query(
        `DELETE FROM email_verifications WHERE email = $1`,
        [email]
      );

      return res.status(400).json({
        message: "OTP has expired",
      });
    }

    // Compare entered OTP with hashed OTP
    const isValid = await bcrypt.compare(
      otp,
      verification.otp_hash
    );

    if (!isValid) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    const innerResult = await db.query(
      `
      INSERT INTO users(email, password_hash, role)
      VALUES($1, $2, 'student')
      RETURNING id, email, role
      `,
      [
        verification.email,
        verification.password_hash,
      ]
    );

    const user = innerResult.rows[0];

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    await db.query(
      `DELETE FROM email_verifications WHERE email = $1`,
      [email]
    );

    return res.status(201).json({
      message: "Email verified and user registered successfully",
      user,
      token,
    });

  } catch (error) {
    console.error("Verify OTP error:", error);

    return res.status(500).json({
      message: "OTP verification failed",
    });
  }
};
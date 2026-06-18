import db from "../config/db.js";

export const createProfile = async (req, res) => {
  try {
    const {
      full_name,
      branch,
      cgpa,
      backlogs,
      resume_url,
      skills
    } = req.body;

    const userId = req.user.id;

    const result = await db.query(
      `
      INSERT INTO student_profiles
      (
        user_id,
        full_name,
        branch,
        cgpa,
        backlogs,
        resume_url,
        skills
      )
      VALUES
      ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
      `,
      [
        userId,
        full_name,
        branch,
        cgpa,
        backlogs,
        resume_url,
        skills,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to create profile",
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await db.query(
      `
      SELECT *
      FROM student_profiles
      WHERE user_id = $1
      `,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch profile",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {
      full_name,
      branch,
      cgpa,
      backlogs,
      resume_url,
      skills,
    } = req.body;

    const result = await db.query(
      `
      UPDATE student_profiles
      SET
        full_name = $1,
        branch = $2,
        cgpa = $3,
        backlogs = $4,
        resume_url=$5,
        skills = $6
      WHERE user_id = $7
      RETURNING *
      `,
      [
        full_name,
        branch,
        cgpa,
        backlogs,
        resume_url,
        skills,
        req.user.id,
      ]
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to update profile",
    });
  }
};
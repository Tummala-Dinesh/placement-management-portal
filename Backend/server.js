import express from "express";
import "dotenv/config";
import db from "./src/config/db.js";
import studentRoutes from "./src/routes/studentRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import jobRoutes from "./src/routes/jobRoutes.js";
import placementRoutes from "./src/routes/placementRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import cors from "cors";
import transporter from "./src/config/mail.js";


const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
];

console.log("FRONTEND_URL =", process.env.FRONTEND_URL);
console.log("allowedOrigins =", allowedOrigins);

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Incoming Origin:", origin);

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/students", studentRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/jobs", jobRoutes);
app.use("/placement", placementRoutes);
app.use("/admin", adminRoutes);


// TEMPORARY EMAIL TEST ROUTE
app.get("/test-email", async (req, res) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "College Portal Email Test",
      text: "Nodemailer is working successfully!",
    });

    res.json({
      message: "Email sent successfully",
    });

  } catch (error) {
    console.error("Email error:", error);

    res.status(500).json({
      message: "Failed to send email",
    });
  }
});


app.get("/", (req, res) => {
  res.send("Placement Management Portal API");
});


async function startServer() {
  try {
    const result = await db.query("SELECT NOW()");
    console.log("Database Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

startServer();
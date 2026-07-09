import express from "express";
import db from "./src/config/db.js";
import studentRoutes from "./src/routes/studentRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import jobRoutes from "./src/routes/jobRoutes.js";
import placementRoutes from "./src/routes/placementRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import cors from "cors";


const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use("/students", studentRoutes);
app.use("/users",userRoutes);
app.use("/auth", authRoutes);
app.use("/jobs", jobRoutes);
app.use("/placement",placementRoutes);
app.use("/admin", adminRoutes);

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
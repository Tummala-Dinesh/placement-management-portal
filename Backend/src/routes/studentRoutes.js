import express from "express";
import { createProfile , getProfile , updateProfile } from "../controllers/studentController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/profile", verifyToken, createProfile);
router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken , updateProfile);

export default router;
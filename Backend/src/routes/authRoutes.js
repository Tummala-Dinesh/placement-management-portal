import express from "express";
import {
  register,
  login,
  getMe,
  sendOTP,
  verifyOTP,
} from "../controllers/authController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me", verifyToken, getMe);

router.post("/send-otp", sendOTP);

router.post("/verify-otp", verifyOTP);

export default router;
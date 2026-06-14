import express from "express";
import { createProfile , getProfile , updateProfile } from "../controllers/studentController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import  authorizeRoles  from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/profile", verifyToken, authorizeRoles("student"), createProfile);

router.get("/profile", verifyToken, authorizeRoles("student"), getProfile);

router.put("/profile", verifyToken, authorizeRoles("student"), updateProfile);

export default router;
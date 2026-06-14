import express from "express";
import { createPlacement } from "../controllers/placementController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import  authorizeRoles  from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  createPlacement
);

export default router;
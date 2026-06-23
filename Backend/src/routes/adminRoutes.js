import express from "express";
import { getDashboardStats , makeAdmin} from "../controllers/adminController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import  authorizeRoles  from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  verifyToken,
  authorizeRoles("admin"),
  getDashboardStats
);

router.put(
  "/make-admin",
   verifyToken, 
   authorizeRoles("admin"),
   makeAdmin);

export default router;
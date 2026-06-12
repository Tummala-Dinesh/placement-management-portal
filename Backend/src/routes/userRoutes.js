import express from "express";
import { getUsers , createUsers } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();
router.get(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  getUsers
);
router.post("/",createUsers);
export default router;

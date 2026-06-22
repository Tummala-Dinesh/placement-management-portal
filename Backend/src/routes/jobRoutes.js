import express from "express";
import {
  getEligibleJobs,
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob
} from "../controllers/jobController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/eligible",
  verifyToken,
  authorizeRoles("student"),
  getEligibleJobs
);

router.post(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  createJob
);

router.get(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  getJobs
);

router.get(
  "/:id",
  verifyToken,
  getJobById
);

router.put(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  updateJob
);

router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  deleteJob
)



export default router;
import express from "express";
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob
} from "../controllers/jobController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import { checkEligibility } from "../controllers/jobController.js";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  createJob
);

router.get(
  "/",
  verifyToken,
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
);

router.get(
  "/:id/eligibility",
  verifyToken,
  authorizeRoles("student"),
  checkEligibility
);

export default router;
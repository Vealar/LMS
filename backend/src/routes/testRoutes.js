import express from "express";
import * as testController from "../controllers/testController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import requireRole from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/tests/:blockId/submission",
    authMiddleware,
    requireRole("STUDENT", "TEACHER", "ADMIN"),
    testController.getTestSubmission);
router.post("/tests/:blockId/start",
    authMiddleware,
    requireRole("STUDENT", "TEACHER", "ADMIN"),
    testController.startTestSubmission);
router.patch("/tests/:blockId/answers",
    authMiddleware,
    requireRole("STUDENT", "TEACHER", "ADMIN"),
    testController.updateTestAnswers);
router.patch("/tests/submission/:submissionId/grade",
    authMiddleware,
    requireRole("STUDENT", "TEACHER", "ADMIN"),
    testController.gradeTestSubmission);

export default router;

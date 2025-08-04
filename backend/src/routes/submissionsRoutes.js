import express from 'express';
import multer from 'multer';
import * as submissionController from '../controllers/submissions/uploadSubmissionController.js';
import {fetchSubmission} from "../controllers/submissions/fetchSubmissionController.js";
import {updateSubmission} from "../controllers/submissions/TODOupdateSubmissionController.js";
import {deleteSubmission} from "../controllers/submissions/TODOdeleteSubmissionController.js";
import authMiddleware from '../middleware/authMiddleware.js';
import requireRole from "../middleware/roleMiddleware.js";

const router = express.Router();
const upload = multer({dest: 'uploads/'});

router.get(
    '/tasks/:taskId/submission',
    authMiddleware,
    requireRole("STUDENT", "TEACHER", "ADMIN"),
    fetchSubmission
);

router.post(
    '/tasks/:taskId/submission',
    authMiddleware,
    requireRole("STUDENT"),
    upload.array('files'),
    submissionController.submitTask
);

router.patch(
    '/tasks/:taskId/submission',
    authMiddleware,
    requireRole("STUDENT"),
    upload.array('files'),
    updateSubmission
);

router.delete(
    '/tasks/:taskId/submission',
    authMiddleware,
    requireRole("STUDENT"),
    deleteSubmission
);

export default router;

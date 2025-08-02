import express from "express";
import multer from "multer";
import { uploadAttachments } from "../controllers/uploadAttachmentsController.js";
import { fetchAttachments } from "../controllers/fetchAttachmentsController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import requireRole from "../middleware/roleMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
    "/blocks/:blockId/attachments",
    authMiddleware,
    requireRole("TEACHER", "ADMIN"),
    upload.array("files"),
    uploadAttachments
);

router.get(
    "/blocks/:blockId/files",
    authMiddleware,
    requireRole("STUDENT", "TEACHER", "ADMIN"),
    fetchAttachments
);

export default router;

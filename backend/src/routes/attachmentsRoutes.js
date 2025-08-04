import express from "express";
import multer from "multer";
import {uploadAttachments} from "../controllers/attachment/uploadAttachmentsController.js";
import {fetchAttachments} from "../controllers/attachment/fetchAttachmentsController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import requireRole from "../middleware/roleMiddleware.js";
import {deleteAttachment} from "../controllers/attachment/deleteAttachmentsController.js";

const router = express.Router();
const upload = multer({dest: "uploads/"});

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
router.delete("/attachments/:id",
    authMiddleware,
    requireRole("TEACHER", "ADMIN"),
    deleteAttachment);

export default router;

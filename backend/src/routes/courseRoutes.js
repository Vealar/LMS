import express from 'express';
import * as courseController from '../controllers/courseController.js';
import authMiddleware from "../middleware/authMiddleware.js";
import requireRole from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
    '/',
    authMiddleware,
    requireRole("TEACHER", "ADMIN"),
    courseController.createCourse
);

router.get('/:courseId/structure', authMiddleware, courseController.getStructure);
router.get('/blocks/:blockId', authMiddleware, courseController.getBlockById);

router.post('/:courseId/topics', authMiddleware, requireRole("TEACHER", "ADMIN"), courseController.createTopic);
router.post('/topics/:topicId/blocks', authMiddleware, requireRole("TEACHER", "ADMIN"), courseController.createBlock);
router.patch('/blocks/:blockId', authMiddleware, requireRole("TEACHER", "ADMIN"), courseController.updateBlock);
router.patch('/topics/:topicId', authMiddleware, requireRole("TEACHER", "ADMIN"), courseController.updateTopic);
router.patch('/:courseId/topics/reorder', authMiddleware, requireRole("TEACHER", "ADMIN"), courseController.reorderTopics);
router.patch('/topics/:topicId/blocks/reorder', authMiddleware, requireRole("TEACHER", "ADMIN"), courseController.reorderBlocks);
router.delete('/topics/:topicId', authMiddleware, requireRole("TEACHER", "ADMIN"), courseController.deleteTopic);
router.delete('/blocks/:blockId', authMiddleware, requireRole("TEACHER", "ADMIN"), courseController.deleteBlock);

export default router;

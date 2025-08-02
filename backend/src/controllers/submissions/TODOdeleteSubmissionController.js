// DELETE /files/tasks/:taskId/submission

import prisma from "../../../prisma/client.js";
import { deleteFileFromS3 } from "../../services/s3Service.js";

export const deleteSubmission = async (req, res) => {
    const { taskId } = req.params;
    const studentId = 1; // req.user.id

    try {
        const submission = await prisma.taskSubmission.findFirst({
            where: { taskId: Number(taskId), studentId },
            include: { attachments: true },
        });

        if (!submission) {
            return res.status(404).json({ message: "Submission not found" });
        }

        // 1. Удалить файлы из S3
        await Promise.all(
            submission.attachments.map((att) => deleteFileFromS3(att.url))
        );

        // 2. Удалить отправку вместе с вложениями (каскадно или вручную)
        await prisma.attachment.deleteMany({
            where: { taskSubmissionId: submission.id },
        });

        await prisma.taskSubmission.delete({
            where: { id: submission.id },
        });

        res.json({ message: "Submission deleted" });
    } catch (error) {
        console.error("Ошибка при удалении задания:", error);
        res.status(500).json({ error: "Не удалось удалить отправку" });
    }
};

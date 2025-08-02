// PATCH /files/tasks/:taskId/submission

import { uploadFileToS3 } from "../../services/s3Service.js";
import prisma from "../../../prisma/client.js";

export const updateSubmission = async (req, res) => {
    const { taskId } = req.params;
    const studentId = 1; // Заменить на req.user.id после подключения auth

    const text = req.body.text ?? "";
    let removeFileIds = [];

    // Безопасно обработать removeFileIds из form-data
    if (req.body.removeFileIds) {
        if (Array.isArray(req.body.removeFileIds)) {
            removeFileIds = req.body.removeFileIds.map(Number);
        } else {
            removeFileIds = req.body.removeFileIds
                .split(",")
                .map((id) => Number(id.trim()))
                .filter(Boolean);
        }
    }

    const newFiles = req.files || [];

    try {
        // 1. Найти существующую отправку
        const existing = await prisma.taskSubmission.findFirst({
            where: { taskId: Number(taskId), studentId },
            include: { attachments: true },
        });

        if (!existing) {
            return res.status(404).json({ message: "Submission not found" });
        }

        // 2. Удалить указанные файлы из базы (и при желании — из S3)
        if (removeFileIds.length > 0) {
            await prisma.attachment.deleteMany({
                where: {
                    id: { in: removeFileIds },
                    submissionId: existing.id,
                },
            });
        }

        // 3. Загрузить новые файлы
        const uploadedFiles = await Promise.all(
            newFiles.map((file) => uploadFileToS3(file, `student/${studentId}`))
        );

        // 4. Обновить текст и прикрепить новые вложения
        const updated = await prisma.taskSubmission.update({
            where: { id: existing.id },
            data: {
                answer: text,
                attachments: {
                    create: uploadedFiles.map((file) => ({
                        fileName: file.filename,
                        url: file.url,
                    })),
                },
            },
            include: {
                attachments: true,
                feedback: {
                    include: {
                        author: {
                            select: {
                                fullName: true,
                                role: true,
                            },
                        },
                    },
                },
            },
        });

        res.json(updated);
    } catch (error) {
        console.error("Ошибка при обновлении задания:", error);
        res.status(500).json({ error: "Ошибка при обновлении отправки" });
    }
};

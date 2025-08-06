import {uploadFileToS3} from "../../services/s3Service.js";
import prisma from "../../../prisma/client.js";

export const updateSubmission = async (req, res) => {
    const {taskId} = req.params;
    const studentId = req.user?.id;

    const text = req.body.text ?? "";
    let removeFileIds = [];

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
        const existing = await prisma.taskSubmission.findFirst({
            where: {taskId: Number(taskId), studentId},
            include: {attachments: true},
        });

        if (!existing) {
            return res.status(404).json({message: "Submission not found"});
        }

        if (removeFileIds.length > 0) {
            await prisma.attachment.deleteMany({
                where: {
                    id: {in: removeFileIds},
                    submissionId: existing.id,
                },
            });
        }

        const uploadedFiles = await Promise.all(
            newFiles.map((file) => uploadFileToS3(file, `student/${studentId}`))
        );

        const updated = await prisma.taskSubmission.update({
            where: {id: existing.id},
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
        res.status(500).json({error: "Ошибка при обновлении отправки"});
    }
};

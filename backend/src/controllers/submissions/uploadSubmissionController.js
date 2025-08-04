import {uploadFileToS3} from "../../services/s3Service.js";
import prisma from "../../../prisma/client.js";

export const submitTask = async (req, res) => {
    const {taskId} = req.params;
    const studentId = 1//req.user.id; // предполагается auth middleware
    const {text} = req.body;
    const files = req.files || [];

    try {
        const uploadedFiles = await Promise.all(
            files.map((file) => uploadFileToS3(file, `student/${studentId}`))
        );

        const submission = await prisma.taskSubmission.create({
            data: {
                taskId: Number(taskId),
                studentId,
                answer: text || "",
                status: "PENDING",
                attachments: {
                    create: uploadedFiles.map((file) => ({
                        fileName: file.filename,
                        url: file.url,
                    })),
                },
            },
            include: {
                attachments: true,
            },
        });

        res.json(submission);
    } catch (err) {
        console.error("Ошибка при отправке задания:", err);
        res.status(500).json({error: "Ошибка при отправке задания"});
    }
};

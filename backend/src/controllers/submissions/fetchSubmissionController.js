import prisma from "../../../prisma/client.js";

export const fetchSubmission = async (req, res) => {
    const {taskId} = req.params;
    const studentId = req.user.id;

    try {
        const submission = await prisma.taskSubmission.findFirst({
            where: {
                taskId: Number(taskId),
                studentId: studentId,
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

        if (!submission) {
            return res.status(404).json({message: "Submission not found"});
        }

        res.json(submission);
    } catch (error) {
        console.error("Ошибка при получении отправки задания:", error);
        res.status(500).json({error: "Не удалось получить отправку задания"});
    }
};

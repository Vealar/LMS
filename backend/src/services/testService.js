import prisma from "../../prisma/client.js";

export const getTestSubmission = async (blockId, studentId) => {
    return prisma.testSubmission.findFirst({
        where: {
            taskId: blockId,
            studentId,
        },
    });
};

export const startTestSubmission = async (blockId, studentId) => {
    const existing = await getTestSubmission(blockId, studentId);
    if (existing) return existing;

    return prisma.testSubmission.create({
        data: {
            taskId: blockId,
            studentId,
            answers: {},
        },
    });
};

export const updateTestAnswers = async (blockId, studentId, answers) => {
    const submission = await prisma.testSubmission.findFirst({
        where: {
            taskId: blockId,
            studentId,
        },
    });

    if (!submission) {
        throw new Error("Попытка не найдена");
    }

    return prisma.testSubmission.update({
        where: {
            id: submission.id,
        },
        data: {
            answers,
            updatedAt: new Date(),
        },
    });
};

export const updateTestGrade = async (submissionId, grade, status) => {
    return prisma.testSubmission.update({
        where: { id: submissionId },
        data: {
            grade,
            status,
        },
    });
};

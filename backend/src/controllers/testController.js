import * as testService from "../services/testService.js";

export const getTestSubmission = async (req, res) => {
    const { blockId } = req.params;
    const studentId = req.user?.id;

    try {
        const submission = await testService.getTestSubmission(Number(blockId), studentId);

        if (!submission) {
            return res.status(404).json({ message: "Попытка не найдена" });
        }

        res.json(submission);
    } catch (err) {
        console.error("Ошибка при получении попытки:", err);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

export const startTestSubmission = async (req, res) => {
    const { blockId } = req.params;
    const studentId = req.user?.id;

    try {
        const submission = await testService.startTestSubmission(Number(blockId), studentId);
        res.status(201).json(submission);
    } catch (err) {
        console.error("Ошибка при создании попытки:", err);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

export const updateTestAnswers = async (req, res) => {
    const { blockId } = req.params;
    const studentId = req.user?.id;
    const { answers } = req.body;

    try {
        const updated = await testService.updateTestAnswers(Number(blockId), studentId, answers);
        res.json(updated);
    } catch (err) {
        console.error("Ошибка при обновлении ответов:", err);
        res.status(500).json({ message: "Ошибка при обновлении ответов" });
    }
};

export const gradeTestSubmission = async (req, res) => {
    const { submissionId } = req.params;
    const { grade, status } = req.body;

    try {
        const updated = await testService.updateTestGrade(Number(submissionId), grade, status);
        res.json(updated);
    } catch (err) {
        console.error("Ошибка при выставлении оценки:", err);
        res.status(500).json({ message: "Ошибка при выставлении оценки" });
    }
};

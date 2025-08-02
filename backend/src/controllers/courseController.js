import * as courseService from '../services/courseService.js';

export const createCourse = async (req, res) => {
    try {
        const { title, description, ownerId } = req.body;

        if (!title || !ownerId) {
            return res.status(400).json({ message: "Требуются title и ownerId" });
        }

        const course = await courseService.createCourse({ title, description, ownerId });
        res.status(201).json(course);
    } catch (err) {
        console.error("Ошибка при создании курса:", err);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

export const getStructure = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await courseService.getCourseStructure(Number(courseId));
        if (!course) return res.status(404).json({ message: "Курс не найден" });
        res.json(course);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при получении структуры курса" });
    }
};

export const getBlockById = async (req, res) => {
    const { blockId } = req.params;
    const userId = req.user?.id; // TODO заменить на const userId = req.user?.id;

    if (isNaN(blockId)) {
        return res.status(400).json({ error: "Некорректный ID блока" });
    }

    try {
        const block = await courseService.getBlockById(blockId, userId);

        if (!block) {
            return res.status(404).json({ error: "Блок не найден" });
        }

        res.json(block);
    } catch (error) {
        console.error("Ошибка при получении блока:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
};

export const createTopic = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title } = req.body;
        const topic = await courseService.addTopic(Number(courseId), title);
        res.status(201).json(topic);
    } catch (err) {
        res.status(500).json({ message: "Ошибка при добавлении темы" });
    }
};

export const createBlock = async (req, res) => {
    try {
        const { topicId } = req.params;
        const block = await courseService.addBlockToTopic(Number(topicId), req.body);
        res.status(201).json(block);
    } catch (err) {
        res.status(500).json({ message: "Ошибка при добавлении блока" });
    }
};

export const updateBlock = async (req, res) => {
    try {
        const { blockId } = req.params;
        const updated = await courseService.updateBlock(Number(blockId), req.body);
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Ошибка при обновлении блока" });
    }
};

export const updateTopic = async (req, res) => {
    try {
        const { topicId } = req.params;
        const updated = await courseService.updateTopic(Number(topicId), req.body);
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Ошибка при обновлении темы" });
    }
};

export const reorderTopics = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { orderedIds } = req.body; // [3,1,2]
        await courseService.reorderTopics(Number(courseId), orderedIds);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ message: "Ошибка при изменении порядка тем" });
    }
};

export const reorderBlocks = async (req, res) => {
    try {
        const { topicId } = req.params;
        const { orderedIds } = req.body;
        await courseService.reorderBlocks(Number(topicId), orderedIds);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ message: "Ошибка при изменении порядка блоков" });
    }
};

export const deleteTopic = async (req, res) => {
    try {
        const { topicId } = req.params;
        await courseService.deleteTopic(Number(topicId));
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ message: "Ошибка при удалении темы" });
    }
};

export const deleteBlock = async (req, res) => {
    try {
        const { blockId } = req.params;
        await courseService.deleteBlock(Number(blockId));
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ message: "Ошибка при удалении блока" });
    }
};


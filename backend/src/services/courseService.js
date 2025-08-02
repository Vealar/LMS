import prisma from '../../prisma/client.js';

export async function createCourse({ title, description, ownerId }) {
    return prisma.course.create({
        data: {
            title,
            description,
            owner: {
                connect: { id: ownerId },
            },
        },
    });
}

export const getCourseStructure = async (courseId) => {
    return prisma.course.findUnique({
        where: { id: courseId },
        include: {
            topics: {
                orderBy: { order: 'asc' },
                include: {
                    blocks: {
                        orderBy: { order: 'asc' },
                        include: {
                            attachments: true, // можно исключить для экономии
                        },
                    },
                },
            },
        },
    });
};

export const addTopic = async (courseId, title) => {
    const count = await prisma.topic.count({ where: { courseId } });

    return prisma.topic.create({
        data: {
            title,
            courseId,
            order: count,
        },
    });
};

export const addBlockToTopic = async (topicId, blockData) => {
    const count = await prisma.block.count({ where: { topicId } });

    return prisma.block.create({
        data: {
            topicId,
            title: blockData.title || 'Новый блок',
            type: blockData.type || 'THEORY',
            content: blockData.content || {},
            order: count,
            description: blockData.description || null,
            deadline: blockData.deadline || null,
        },
    });
};

export const updateBlock = async (blockId, updates) => {
    const {
        title,
        type,
        content,
        description,
        deadline,
    } = updates;

    return prisma.block.update({
        where: { id: blockId },
        data: {
            ...(title && { title }),
            ...(type && { type }),
            ...(content && { content }),
            ...(description !== undefined && { description }),
            ...(deadline !== undefined && { deadline }),
        },
    });
};

export const updateTopic = async (topicId, updates) => {
    return prisma.topic.update({
        where: { id: topicId },
        data: updates,
    });
};

export const reorderTopics = async (courseId, orderedIds) => {
    const updates = orderedIds.map((id, index) =>
        prisma.topic.update({
            where: { id },
            data: { order: index },
        })
    );
    await prisma.$transaction(updates);
};

export const reorderBlocks = async (topicId, orderedIds) => {
    const updates = orderedIds.map((id, index) =>
        prisma.block.update({
            where: { id },
            data: { order: index },
        })
    );
    await prisma.$transaction(updates);
};

export const deleteBlock = async (blockId) => {
    await prisma.attachment.deleteMany({ where: { blockId } });
    return prisma.block.delete({ where: { id: blockId } });
};

export const deleteTopic = async (topicId) => {
    // удаляем attachments всех блоков темы
    const blocks = await prisma.block.findMany({
        where: { topicId },
        select: { id: true },
    });

    const blockIds = blocks.map(b => b.id);

    await prisma.attachment.deleteMany({
        where: {
            blockId: { in: blockIds },
        },
    });

    await prisma.block.deleteMany({
        where: { topicId },
    });

    return prisma.topic.delete({
        where: { id: topicId },
    });
};

export const getBlockById = async (blockId, userId) => {
    const block = await prisma.block.findUnique({
        where: { id: Number(blockId) },
        include: {
            topic: {
                select: {
                    id: true,
                    title: true,
                    courseId: true,
                },
            },
            attachments: true,
        },
    });

    if (!block) return null;

    if (block.type === 'TASK') {
        const submission = await prisma.taskSubmission.findFirst({
            where: {
                taskId: block.id,
                studentId: userId,
            },
            include: {
                attachments: true,
                feedback: {
                    include: {
                        author: {
                            select: { id: true, fullName: true, role: true },
                        },
                    },
                },
            },
        });

        return {
            ...block,
            submission,
        };
    }

    return block;
};

import prisma from "../../../prisma/client.js";

export const fetchAttachments = async (req, res) => {
    const { blockId } = req.params;

    try {
        const attachments = await prisma.attachment.findMany({
            where: {
                blockId: Number(blockId),
            },
            select: {
                id: true,
                fileName: true,
                fileSize: true,
                mimeType: true,
                url: true,
                uploadedAt: true,
            },
        });

        res.json(attachments);
    } catch (error) {
        console.error("Ошибка при получении файлов блока:", error);
        res.status(500).json({ error: "Не удалось получить файлы" });
    }
};

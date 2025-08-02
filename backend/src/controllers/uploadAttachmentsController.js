import prisma from "../../prisma/client.js";
import { uploadFileToS3 } from "../services/s3Service.js";

export const uploadAttachments = async (req, res) => {
    const { blockId } = req.params;
    const files = req.files || [];

    try {
        const uploadedFiles = await Promise.all(
            files.map((file) => uploadFileToS3(file, `block/${blockId}`))
        );

        const created = await prisma.attachment.createMany({
            data: uploadedFiles.map((file) => ({
                fileName: file.filename,
                fileSize: file.size,
                mimeType: file.mimetype,
                url: file.url,
                blockId: Number(blockId),
            })),
        });

        res.json({ success: true, count: created.count });
    } catch (err) {
        console.error("Ошибка при загрузке файлов к блоку:", err);
        res.status(500).json({ error: "Ошибка при загрузке файлов" });
    }
};

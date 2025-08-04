import prisma from "../../../prisma/client.js";

export const deleteAttachment = async (req, res) => {
    const {id} = req.params;

    try {
        await prisma.attachment.delete({
            where: {id: Number(id)},
        });

        res.json({success: true});
    } catch (err) {
        console.error("Ошибка при удалении файла:", err);
        res.status(500).json({error: "Не удалось удалить файл"});
    }
};

import { openOrDownloadFile } from "./openOrDownloadFile.js";

/**
 * Обрабатывает клик по блоку в сайдбаре
 * @param {MouseEvent} e
 * @param {Object} block
 * @param {Object} topic
 * @param {Function} navigate
 */
export function handleBlockClick(e, block, topic, navigate) {
    e.preventDefault();
    e.stopPropagation();

    if (block.type === "FILE" && block.attachments?.length > 0) {
        const file = block.attachments[0];
        openOrDownloadFile({ url: file.url, fileName: file.fileName });
        return;
    }

    navigate(`/courses/${topic.courseId}/topics/${topic.id}/blocks/${block.id}`);
}

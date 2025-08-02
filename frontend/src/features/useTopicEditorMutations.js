import { useCourseMutations } from "./useCourseMutations.js";
import { toast } from "sonner";

export const useTopicEditorMutations = (courseId, onSuccessCallback) => {
    const { updateTopic, deleteTopic } = useCourseMutations(courseId);

    const handleSaveTitle = (topicId, title) => {
        if (!title.trim()) return;

        updateTopic.mutate(
            { topicId, updates: { title } },
            {
                onSuccess: () => {
                    toast.success("Название темы обновлено");
                    onSuccessCallback?.();
                },
                onError: () => {
                    toast.error("Ошибка при сохранении темы");
                },
            }
        );
    };

    const handleDeleteTopic = (topicId) => {
        deleteTopic.mutate(topicId, {
            onSuccess: () => {
                toast.success("Тема и её блоки удалены");
                onSuccessCallback?.();
            },
            onError: () => {
                toast.error("Ошибка при удалении темы");
            },
        });
    };

    return {
        handleSaveTitle,
        handleDeleteTopic,
    };
};

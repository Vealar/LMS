import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/courseApi.js";

export const useCourseMutations = (courseId) => {
    const queryClient = useQueryClient();

    const refresh = () => queryClient.invalidateQueries(["courseStructure", courseId]);

    return {
        addTopic: useMutation({
            mutationFn: () => api.createTopic(courseId),
            onSuccess: refresh,
        }),

        addBlock: useMutation({
            mutationFn: ({ topicId, block }) => api.createBlock(topicId, block),
            onSuccess: refresh,
        }),

        updateBlock: useMutation({
            mutationFn: ({ blockId, updates }) => api.updateBlock(blockId, updates),
            onSuccess: refresh,
        }),

        updateTopic: useMutation({
            mutationFn: ({ topicId, updates }) => api.updateTopic(topicId, updates),
            onSuccess: refresh,
        }),

        reorderBlocks: useMutation({
            mutationFn: ({ topicId, orderedIds }) => api.reorderBlocks(topicId, orderedIds),
            onSuccess: refresh,
        }),

        reorderTopics: useMutation({
            mutationFn: ({ orderedIds }) => api.reorderTopics(courseId, orderedIds),
            onSuccess: refresh,
        }),

        deleteBlock: useMutation({
            mutationFn: (blockId) => api.deleteBlock(blockId),
            onSuccess: refresh,
        }),

        deleteTopic: useMutation({
            mutationFn: (topicId) => api.deleteTopic(topicId),
            onSuccess: refresh,
        }),
    };
};

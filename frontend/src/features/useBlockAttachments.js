import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    fetchBlockAttachments,
    uploadBlockAttachments,
    deleteAttachment,
} from "@/api/filesApi.js";

export const useBlockAttachments = (blockId) => {
    return useQuery({
        queryKey: ["blockAttachments", blockId],
        queryFn: () => fetchBlockAttachments(blockId),
        enabled: !!blockId,
        staleTime: 60 * 1000,
    });
};

export const useUploadBlockAttachments = (blockId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (formData) => uploadBlockAttachments(blockId, formData),
        onSuccess: () => {
            queryClient.invalidateQueries(["blockAttachments", blockId]);
        },
    });
};

export const useDeleteAttachment = (blockId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (attachmentId) => deleteAttachment(attachmentId),
        onSuccess: () => {
            queryClient.invalidateQueries(["blockAttachments", blockId]);
        },
    });
};

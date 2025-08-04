import { useBlockAttachments, useUploadBlockAttachments, useDeleteAttachment } from "./useBlockAttachments.js";

export const useAttachments = (blockId) => {
    const { data: attachments = [], isLoading } = useBlockAttachments(blockId);
    const uploadMutation = useUploadBlockAttachments(blockId);
    const deleteMutation = useDeleteAttachment(blockId);

    const handleUpload = async (formData) => {
        return await uploadMutation.mutateAsync(formData);
    };

    const handleDelete = async (attachmentId) => {
        return await deleteMutation.mutateAsync(attachmentId);
    };

    return {
        attachments,
        isLoading,
        handleUpload,
        handleDelete,
        isUploading: uploadMutation.isPending,
        isDeleting: deleteMutation.isPending,
    };
};

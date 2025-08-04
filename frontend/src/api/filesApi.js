import {instance} from "@/api/commonApi.js";

export const uploadBlockAttachments = async (blockId, formData) => {
    const res = await instance.post(
        `/files/blocks/${blockId}/attachments`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
    );
    return res.data;
};

export const fetchBlockAttachments = async (blockId) => {
    const res = await instance.get(`/files/blocks/${blockId}/files`);
    return res.data;
};

export const deleteAttachment = async (attachmentId) => {
    const res = await instance.delete(`/files/attachments/${attachmentId}`);
    return res.data;
};

export const submitTask = async (taskId, formData) => {
    const res = await instance.post(
        `/files/tasks/${taskId}/submission`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
    );
    return res.data;
};

export const fetchTaskSubmission = async (taskId) => {
    const res = await instance.get(`/files/tasks/${taskId}/submission`);
    return res.data;
};

import { instance } from "@/api/commonApi.js";

export const fetchTestSubmission = async (blockId) => {
    const res = await instance.get(`/tests/${blockId}/submission`);
    return res.data;
};

export const startTestSubmission = async (blockId) => {
    const res = await instance.post(`/tests/${blockId}/start`);
    return res.data;
};

export const updateTestAnswers = async (blockId, answers) => {
    const res = await instance.patch(`/tests/${blockId}/answers`, { answers });
    return res.data;
};

export const gradeTestSubmission = async (submissionId, grade, status) => {
    const res = await instance.patch(`/tests/submission/${submissionId}/grade`, {
        grade,
        status,
    });
    return res.data;
};

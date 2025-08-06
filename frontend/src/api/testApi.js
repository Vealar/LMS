import {instance} from "@/api/commonApi";

export async function getTestSubmission(blockId) {
    try {
        const res = await instance.get(`/tests/${blockId}/submission`);
        return res.data;
    } catch (err) {
        if (err.response && err.response.status === 404) {
            return null;
        }
        throw err;
    }
}

export const startTestSubmission = (blockId) =>
    instance.post(`/tests/${blockId}/start`).then(res => res.data);

export const patchTestAnswers = (blockId, answers) =>
    instance.patch(`/tests/${blockId}/answers`, {answers}).then(res => res.data);

export const patchTestGrade = (submissionId, grade, status) =>
    instance.patch(`/tests/submission/${submissionId}/grade`, {grade, status}).then(res => res.data);

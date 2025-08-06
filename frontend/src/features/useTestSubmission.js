import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getTestSubmission,
    startTestSubmission,
    patchTestAnswers,
    patchTestGrade,
} from "@/api/testApi";


export const useTestSubmission = (blockId) => {
    return useQuery({
        queryKey: ["test-submission", blockId],
        queryFn: () => getTestSubmission(blockId),
        enabled: !!blockId,
        retry: false,
    });
};

export const useStartTestSubmission = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (blockId) => startTestSubmission(blockId),
        onSuccess: (data, blockId) => {
            queryClient.setQueryData(["test-submission", blockId], data);
        },
    });
};

export const useUpdateTestAnswers = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ blockId, answers }) => patchTestAnswers(blockId, answers),
        onSuccess: (data, { blockId }) => {
            queryClient.setQueryData(["test-submission", blockId], data);
        },
    });
};

export const useGradeTestSubmission = () => {
    return useMutation({
        mutationFn: ({ submissionId, grade, status }) =>
            patchTestGrade(submissionId, grade, status),
    });
};

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    fetchTestSubmission,
    startTestSubmission,
    updateTestAnswers,
    gradeTestSubmission,
} from "@/api/testApi";

export const useTestSubmission = (blockId) => {
    return useQuery({
        queryKey: ["test-submission", blockId],
        queryFn: () => fetchTestSubmission(blockId),
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
        mutationFn: ({ blockId, answers }) => updateTestAnswers(blockId, answers),
        onSuccess: (data, variables) => {
            queryClient.setQueryData(["test-submission", variables.blockId], data);
        },
    });
};

export const useGradeTestSubmission = () => {
    return useMutation({
        mutationFn: ({ submissionId, grade, status }) =>
            gradeTestSubmission(submissionId, grade, status),
    });
};

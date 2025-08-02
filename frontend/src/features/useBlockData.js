import { useQuery } from "@tanstack/react-query";
import { fetchBlockById } from "../api/courseApi.js"; // адаптируй путь

export const useBlockData = (blockId) => {
    return useQuery({
        queryKey: ["block", blockId],
        queryFn: () => fetchBlockById(blockId),
        enabled: !!blockId,
    });
};

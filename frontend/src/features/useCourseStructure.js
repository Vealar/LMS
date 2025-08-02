import { useQuery } from "@tanstack/react-query";
import { fetchCourseStructure } from "../api/courseApi.js";

export const useCourseStructure = (courseId) => {
    return useQuery({
        queryKey: ["courseStructure", courseId],
        queryFn: () => fetchCourseStructure(courseId),
        staleTime: 5 * 60 * 1000,
        enabled: !!courseId,
    });
};

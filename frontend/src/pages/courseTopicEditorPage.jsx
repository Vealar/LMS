import { useParams, useNavigate } from "react-router-dom";
import { useCourseStructure } from "@/features/useCourseStructure";
import { TopicEditor } from "@/components/course/middle/Topic/topicEditor.jsx";

export default function CourseTopicEditorPage() {
    const { topicId, courseId } = useParams();
    const { data } = useCourseStructure(courseId);
    const navigate = useNavigate();

    const topic = data?.topics?.find((t) => String(t.id) === topicId);

    if (!topic) return <div className="p-4">Тема не найдена</div>;

    return (
        <TopicEditor
            topic={topic}
            courseId={courseId}
            onClose={() => navigate(`/courses/${courseId}`)}
        />
    );
}

import { useParams } from "react-router-dom";
import { useBlockData } from "@/features/useBlockData.js";
import TheoryView from "@/components/course/middle/Theory/TheoryView.jsx";
import TestView from "@/components/course/middle/Test/TestView.jsx";
import TaskView from "@/components/course/middle/Task/TaskView.jsx";

export default function CourseMainPage() {
    const { blockId } = useParams();
    const { data, isLoading } = useBlockData(blockId);

    if (isLoading) return <div>Загрузка материала...</div>;
    if (!data) return <div>Материал не найден</div>;

    switch (data.type) {
        case "THEORY":
            return <TheoryView theory={data} />;
        case "TASK":
            return <TaskView task={data} />;
        case "TEST":
            return <TestView test={data.content} />;
        case "FILE":
            if (data.attachments?.length > 0) {
                const firstFileUrl = data.attachments[0].url;
                window.open(firstFileUrl, "_blank");
            }
            return null;
        default:
            return <div>Неизвестный тип блока: {data.type}</div>;
    }
}

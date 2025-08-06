import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditing } from "@/components/context/editingContext";
import { useBlockData } from "@/features/useBlockData";

import TheoryView from "@/components/course/middle/Theory/theoryView.jsx";
import TaskView from "@/components/course/middle/Task/TaskView.jsx";
import TestView from "@/components/course/middle/Test/testView.jsx";
import FileView from "@/components/course/middle/File/FileView.jsx";

export default function CourseMainPage() {
    const { blockId, courseId } = useParams();
    const { data, isLoading } = useBlockData(blockId);
    const { editing } = useEditing();
    const navigate = useNavigate();

    useEffect(() => {
        if (!editing && data?.type === "FILE") {
            navigate(`/courses/${courseId}`, { replace: true });
        }
    }, [editing, data, courseId, navigate]);

    if (isLoading) return <div>Загрузка материала...</div>;
    if (!data) return <div>Материал не найден</div>;

    switch (data.type) {
        case "THEORY":
            return <TheoryView theory={data} />;
        case "TASK":
            return <TaskView task={data} />;
        case "TEST":
            return <TestView test={data} />;
        case "FILE":
            return editing ? <FileView fileBlock={data} /> : null;
        default:
            return <div>Неизвестный тип блока: {data.type}</div>;
    }
}

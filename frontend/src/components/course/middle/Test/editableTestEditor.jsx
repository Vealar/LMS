import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button.jsx";
import QuestionEditor from "./QuestionEditor.jsx";
import {toast} from "sonner";

export default function EditableTestEditor({blockId, initialQuestions, updateBlock, currentContent}) {
    const [showEditor, setShowEditor] = useState(false);
    const [questions, setQuestions] = useState(initialQuestions || []);
    useEffect(() => {
        setQuestions(initialQuestions || []);
    }, [initialQuestions]);

    const handleAddQuestion = () => {
        const newQuestion = {
            id: crypto.randomUUID(),
            text: "",
            type: "single", // или "multiple"
            options: [],
        };
        setQuestions((prev) => [...prev, newQuestion]);
    };

    const handleUpdateQuestion = (idx, updated) => {
        const updatedList = [...questions];
        updatedList[idx] = updated;
        setQuestions(updatedList);
    };

    const handleDeleteQuestion = (idx) => {
        const updatedList = [...questions];
        updatedList.splice(idx, 1);
        setQuestions(updatedList);
    };

    const handleSaveQuestions = () => {
        if (!blockId) {
            toast.error("Ошибка: отсутствует ID блока.");
            return;
        }

        updateBlock.mutate(
            {
                blockId,
                updates: {
                    content: {
                        ...(currentContent || {}),
                        questions,
                    },
                },
            },
            {
                onSuccess: () => {
                    toast.success("Структура теста успешно сохранена");
                },
                onError: () => {
                    toast.error("Ошибка при сохранении теста");
                },
            }
        );
    };


    return (
        <div className="space-y-4">
            <Button onClick={() => setShowEditor((v) => !v)} variant="secondary">
                {showEditor ? "Скрыть редактор теста" : "Редактировать структуру теста"}
            </Button>

            {showEditor && (
                <>
                    <div className="space-y-4">
                        {questions.map((q, idx) => (
                            <QuestionEditor
                                key={q.id}
                                question={q}
                                onChange={(updated) => handleUpdateQuestion(idx, updated)}
                                onDelete={() => handleDeleteQuestion(idx)}
                            />
                        ))}
                    </div>

                    <div className="flex gap-2 justify-between mt-4">
                        <Button onClick={handleAddQuestion} variant="outline">
                            Добавить вопрос
                        </Button>
                        <Button onClick={handleSaveQuestions}>
                            Сохранить тест
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}

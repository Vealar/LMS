import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Label } from "@/components/ui/label.jsx";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function StudentTestPreview({ testBlock, onSubmitComplete }) {
    const navigate = useNavigate();
    const questions = testBlock.questions || [];
    const totalTime = (testBlock.timeLimit || 0) * 60; // минут → секунды
    const storageKey = `test-${testBlock.id}`;

    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(totalTime);
    const timerRef = useRef(null);
    const submittedRef = useRef(false);

    // ⏱ форматирование времени
    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
        const s = Math.floor(seconds % 60).toString().padStart(2, "0");
        return `${h}:${m}:${s}`;
    };

    // 🚀 Загрузка данных из localStorage
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem(storageKey));
        const now = Date.now();

        if (saved?.submitted) {
            submittedRef.current = true;
            return;
        }

        if (saved?.startTime) {
            const elapsed = Math.floor((now - saved.startTime) / 1000);
            const remaining = totalTime - elapsed;
            setTimeLeft(remaining > 0 ? remaining : 0);
        } else {
            localStorage.setItem(storageKey, JSON.stringify({ startTime: now, answers: {} }));
        }

        if (saved?.answers) {
            setAnswers(saved.answers);
        }
    }, [storageKey, totalTime]);

    // 💾 Сохранение ответов
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem(storageKey)) || {};
        localStorage.setItem(storageKey, JSON.stringify({ ...saved, answers }));
    }, [answers, storageKey]);

    // ⏲️ Таймер
    useEffect(() => {
        if (totalTime === 0 || submittedRef.current) return;

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    toast.warning("Время вышло! Тест отправлен автоматически.");
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [totalTime]);

    // ✅ Обработка выбора ответа
    const handleOptionChange = (questionId, value, type) => {
        setAnswers((prev) => {
            if (type === "single") {
                return { ...prev, [questionId]: value };
            } else {
                const prevAnswers = prev[questionId] || [];
                return {
                    ...prev,
                    [questionId]: prevAnswers.includes(value)
                        ? prevAnswers.filter((v) => v !== value)
                        : [...prevAnswers, value],
                };
            }
        });
    };

    // 🚀 Отправка теста
    const handleSubmit = () => {
        if (submittedRef.current) return;
        submittedRef.current = true;

        console.log("Ответы студента:", answers);

        // TODO: submitTest(testBlock.id, answers)

        toast.success("Ответы успешно отправлены");

        // Сохраняем факт сдачи
        localStorage.setItem(storageKey, JSON.stringify({ submitted: true }));
        if (onSubmitComplete) onSubmitComplete();

        setTimeout(() => {
            navigate(-1);
        }, 1000);
    };

    return (
        <div className="space-y-6">
            {totalTime > 0 && (
                <div className="text-right text-sm text-muted-foreground">
                    Времени осталось: <span className="font-mono">{formatTime(timeLeft)}</span>
                </div>
            )}

            {questions.map((q, index) => (
                <Card key={q.id} className="p-4 space-y-4">
                    <div className="font-medium">
                        {index + 1}. {q.text}
                    </div>
                    <div className="space-y-2">
                        {q.options.map((option) => (
                            <div key={option.id} className="flex items-center gap-2">
                                <input
                                    type={q.type === "single" ? "radio" : "checkbox"}
                                    name={`question-${q.id}`}
                                    value={option.id}
                                    checked={
                                        q.type === "single"
                                            ? answers[q.id] === option.id
                                            : (answers[q.id] || []).includes(option.id)
                                    }
                                    onChange={() => handleOptionChange(q.id, option.id, q.type)}
                                    disabled={submittedRef.current}
                                />
                                <Label>{option.text}</Label>
                            </div>
                        ))}
                    </div>
                </Card>
            ))}

            <div className="flex justify-end">
                <Button onClick={handleSubmit} disabled={submittedRef.current}>
                    Отправить ответы
                </Button>
            </div>
        </div>
    );
}

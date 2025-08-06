import {useEffect, useState, useRef} from "react";
import {Card} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Label} from "@/components/ui/label.jsx";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";
import {useStartTestSubmission, useUpdateTestAnswers} from "@/features/useTestSubmission";

export default function StudentTestPreview({testBlock, submission}) {
    const navigate = useNavigate();
    const questions = testBlock.questions || [];
    const timeLimit = (testBlock.timeLimit || 0) * 60;

    const [currentSubmission, setCurrentSubmission] = useState(submission);
    const [answers, setAnswers] = useState(submission?.answers || {});
    const [timeLeft, setTimeLeft] = useState(timeLimit);
    const timerRef = useRef(null);
    const submittedRef = useRef(false);

    const {mutate: startSubmission, isPending} = useStartTestSubmission();

    useEffect(() => {
        if (!currentSubmission?.createdAt) return;

        const start = new Date(currentSubmission.createdAt).getTime();
        const now = Date.now();
        const elapsed = Math.floor((now - start) / 1000);
        const remaining = timeLimit - elapsed;
        setTimeLeft(remaining > 0 ? remaining : 0);

        if (currentSubmission.answers) {
            setAnswers(currentSubmission.answers);
        }
    }, [currentSubmission, timeLimit]);

    useEffect(() => {
        if (timeLeft <= 0 || submittedRef.current) return;

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    handleSubmit();
                    toast.warning("Время вышло!");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    const handleOptionChange = (questionId, value, type) => {
        setAnswers((prev) => {
            if (type === "single") {
                return {...prev, [questionId]: value};
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

    const {mutateAsync: updateAnswers} = useUpdateTestAnswers();

    const handleSubmit = async () => {
        if (submittedRef.current) return;
        submittedRef.current = true;

        try {
            await updateAnswers({
                blockId: testBlock.id,
                answers,
            });

            toast.success("Ответы отправлены");
        } catch (e) {
            toast.error("Ошибка при отправке ответов");
            return;
        }

        setTimeout(() => {
        }, 1000);
    };

    if (!currentSubmission) {
        return (
            <div className="space-y-4">
                <p>Вы ещё не начали этот тест.</p>
                <Button
                    onClick={() =>
                        startSubmission(testBlock.id, {
                            onSuccess: (data) => setCurrentSubmission(data),
                            onError: () => toast.error("Не удалось начать попытку"),
                        })
                    }
                    disabled={isPending}
                >
                    {isPending ? "Запуск..." : "Начать тест"}
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="text-right text-muted-foreground">
                Времени осталось: <span className="font-mono">{formatTime(timeLeft)}</span>
            </div>

            {questions.map((q, index) => (
                <Card key={q.id} className="p-4 space-y-4">
                    <div className="font-medium">{index + 1}. {q.text}</div>
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
                                />
                                <Label>{option.text}</Label>
                            </div>
                        ))}
                    </div>
                </Card>
            ))}

            <div className="flex justify-end">
                <Button onClick={handleSubmit} disabled={submittedRef.current}>
                    Отправить
                </Button>
            </div>
        </div>
    );
}

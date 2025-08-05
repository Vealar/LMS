import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button.jsx";
import StudentTestPreview from "./studentTestPreview.jsx";

export default function StudentTestWrapper({ testBlock }) {
    const storageKey = `test-${testBlock.id}`;
    const [started, setStarted] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem(storageKey));
        if (saved?.submitted) {
            setSubmitted(true);
        } else if (saved?.startTime) {
            setStarted(true);
        }
    }, [storageKey]);

    const handleStart = () => {
        const now = Date.now();
        localStorage.setItem(storageKey, JSON.stringify({ startTime: now, answers: {} }));
        setStarted(true);
    };

    const handleComplete = () => {
        setSubmitted(true);
        localStorage.setItem(storageKey, JSON.stringify({ submitted: true }));
    };

    if (submitted) {
        return (
            <div className="text-center text-muted-foreground mt-4">
                Вы уже прошли этот тест. Повторное прохождение невозможно.
            </div>
        );
    }

    return (
        <>
            {!started ? (
                <div className="mt-4">
                    <Button onClick={handleStart}>
                        Начать попытку
                    </Button>
                </div>
            ) : (
                <StudentTestPreview testBlock={testBlock} onSubmitComplete={handleComplete} />
            )}
        </>
    );
}

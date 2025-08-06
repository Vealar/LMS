import {Button} from "@/components/ui/button.jsx";
import StudentTestPreview from "./studentTestPreview.jsx";
import {useStartTestSubmission, useTestSubmission} from "@/features/useTestSubmission.js";

export default function StudentTestWrapper({testBlock}) {
    const {data: submission, isLoading, refetch} = useTestSubmission(testBlock.id);
    const startTest = useStartTestSubmission();

    const handleStart = async () => {
        await startTest.mutateAsync(testBlock.id);
        await refetch();
    };

    if (isLoading) return <div>Загрузка...</div>;

    const now = Date.now();
    const submissionTime = submission?.createdAt ? new Date(submission.createdAt).getTime() : 0;
    const timeLimit = (testBlock.timeLimit || 0) * 60 * 1000;
    const deadline = submissionTime + timeLimit;
    const timeRemaining = deadline - now;

    const isActiveAttempt =
        submission &&
        submission.status === "NOT_SUBMITTED" &&
        timeRemaining > 0;

    if (isActiveAttempt) {
        return (
            <StudentTestPreview
                testBlock={testBlock}
                submission={submission}
            />
        );
    }
    if (isLoading) return <div>Загрузка...</div>;

    if (submission?.submitted || submission?.status === "PENDING") {
        return (
            <div className="text-muted-foreground mt-4">
                Вы уже прошли этот тест. Повторное прохождение невозможно.
            </div>
        );
    }
    return (
        <div className="mt-4 space-y-2 text-muted-foreground">
            {submission && submission.status === "NOT_SUBMITTED" && timeRemaining <= 0 && (
                <p>Время на выполнение теста истекло.</p>
            )}
            {submission && submission.status !== "NOT_SUBMITTED" && (
                <p>Вы уже отправили этот тест.</p>
            )}
            <Button onClick={handleStart}>Начать попытку</Button>
        </div>
    );
}

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

import TaskHeader from "./TaskHeader";
import TaskDescription from "./TaskDescription";
import TaskAttachments from "./TaskAttachments";
import TaskSubmissionForm from "./TaskSubmission/TaskSubmissionForm.jsx";
import TaskFeedback from "./TaskFeedback";
import ConfirmDialog from "./TaskSubmission/ConfirmDialog.jsx";
import { Button } from "@/components/ui/button";
import { submitTask } from "@/api/filesApi.js";
import { useQueryClient } from "@tanstack/react-query";

export default function TaskView({ task }) {
    const {
        id,
        title,
        deadline,
        description,
        attachments = [],
        submission,
        feedback = [],
    } = task;

    const queryClient = useQueryClient();

    const [showForm, setShowForm] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [dialogData, setDialogData] = useState(null);

    const { status, grade } = submission || {};

    const handlePreSubmit = (formData) => {
        setDialogData(formData);
        setShowDialog(true);
    };

    const handleConfirm = async () => {
        if (!dialogData) return;

        try {
            await submitTask(id, dialogData);

            setShowDialog(false);
            setDialogData(null);
            setShowForm(false);

            queryClient.invalidateQueries(["block", id]);

            setTimeout(() => {
                toast.success("Ответ успешно отправлен!");
            }, 300);
        } catch (error) {
            console.error("Ошибка при отправке:", error);
            toast.error("Ошибка при отправке ответа.");
        }
    };

    return (
        <div className="w-full mx-auto px-4 mt-8 space-y-6">
            <Card className="rounded-xl p-6 bg-muted/50 space-y-4">
                <TaskHeader title={title} deadline={deadline} status={status} grade={grade} />
            </Card>

            <Card className="rounded-xl p-6 bg-muted/50 space-y-6">
                <TaskDescription description={description} />
                <TaskAttachments attachments={attachments} />

                {!showForm && (
                    <div className="w-full flex justify-start">
                        {submission ? (
                            <Button
                                disabled
                                variant="secondary"
                                className="w-auto px-4 py-2 text-sm opacity-80 cursor-not-allowed"
                            >
                                Задание отправлено
                            </Button>
                        ) : (
                            <Button
                                onClick={() => setShowForm(true)}
                                className="w-auto px-4 py-2 text-sm"
                            >
                                Отправить ответ
                            </Button>
                        )}
                    </div>
                )}

                {showForm && (
                    <TaskSubmissionForm taskId={id} onSubmit={handlePreSubmit} />
                )}

                <TaskFeedback feedback={feedback} />
            </Card>

            <ConfirmDialog
                open={showDialog}
                onOpenChange={setShowDialog}
                onCancel={() => setShowDialog(false)}
                onConfirm={handleConfirm}
                data={dialogData}
            />
        </div>
    );
}

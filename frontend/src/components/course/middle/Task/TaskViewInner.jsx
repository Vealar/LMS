import {submitTask} from "@/api/filesApi.js";
import {useMeta} from "@/components/course/middle/commonElements/editableMetaForm.jsx";
import {useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {toast} from "sonner";
import {Card} from "@/components/ui/card.jsx";
import {EditableDeadline} from "@/components/course/middle/commonElements/editableDeadline.jsx";
import {EditableTitle} from "@/components/course/middle/commonElements/editableTitle.jsx";
import TaskHeader from "@/components/course/middle/Task/TaskHeader.jsx";
import {Button} from "@/components/ui/button.jsx";
import TaskDescription from "@/components/course/middle/Task/TaskDescription.jsx";
import {EditableDescription} from "@/components/course/middle/commonElements/editableDescription.jsx";
import TaskSubmissionForm from "@/components/course/middle/Task/TaskSubmission/TaskSubmissionForm.jsx";
import TaskFeedback from "@/components/course/middle/Task/TaskFeedback.jsx";
import ConfirmDialog from "@/components/course/middle/Task/TaskSubmission/ConfirmDialog.jsx";
import {AttachmentManager} from "@/components/course/middle/commonElements/attachmentManager.jsx";

export function TaskViewInner({ task }) {
    const {
        id,
        attachments = [],
        submission,
        feedback = [],
    } = task;

    const { title, setTitle, description, setDescription, deadline, setDeadline, editing } = useMeta();

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
            toast.success("Ответ успешно отправлен!");
        } catch (error) {
            console.error("Ошибка при отправке:", error);
            toast.error("Ошибка при отправке ответа.");
        }
    };

    return (
        <div className="w-full mx-auto px-4 mt-8 space-y-6">
            <Card className="rounded-xl p-6 bg-muted/50 space-y-4">
                {/* Заголовок, дедлайн, статус */}
                {editing ? (
                    <>
                        <EditableTitle value={title} editing={editing} onChange={setTitle} />
                        <EditableDeadline value={deadline} editing={editing} onChange={setDeadline} />
                    </>
                ) : (
                    <TaskHeader title={title} deadline={deadline} status={status} grade={grade} />
                )}
            </Card>

            <Card className="rounded-xl p-6 bg-muted/50 space-y-6">
                {editing ? (
                    <EditableDescription value={description} editing={editing} onChange={setDescription} />
                ) : (
                    <TaskDescription description={description} />
                )}

                <AttachmentManager blockId={task.id} editing={editing} />

                {!editing && !showForm && (
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

                {!editing && showForm && (
                    <TaskSubmissionForm taskId={id} onSubmit={handlePreSubmit} />
                )}

                {!editing && <TaskFeedback feedback={feedback} />}
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

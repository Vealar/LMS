import { useState } from "react";
import { Card } from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Button } from "@/components/ui/button.jsx";

import { useMeta } from "@/components/course/middle/commonElements/editableMetaForm.jsx";
import { EditableTitle } from "@/components/course/middle/commonElements/editableTitle.jsx";
import { EditableDescription } from "@/components/course/middle/commonElements/editableDescription.jsx";
import { EditableDeadline } from "@/components/course/middle/commonElements/editableDeadline.jsx";
import { AttachmentManager } from "@/components/course/middle/commonElements/attachmentManager.jsx";

import StudentTestPreview from "@/components/course/middle/Test/studentTestPreview.jsx";
import EditableTestEditor from "@/components/course/middle/Test/editableTestEditor.jsx";
import { useCourseMutations } from "@/features/useCourseMutations.js";

export function TestViewInner({ test }) {
    const {
        title, setTitle,
        description, setDescription,
        deadline, setDeadline,
        attempts, setAttempts,
        timeLimit, setTimeLimit,
        editing,
    } = useMeta();

    const [started, setStarted] = useState(false);
    const { updateBlock } = useCourseMutations(test.courseId);

    const questions = test.content?.questions || [];

    return (
        <div className="w-full mx-auto px-6 mt-8 space-y-6">
            <Card className="rounded-xl p-6 bg-muted/50 space-y-6">
                <EditableTitle value={title} editing={editing} onChange={setTitle} />
                <EditableDescription value={description} editing={editing} onChange={setDescription} />
                <EditableDeadline value={deadline} editing={editing} onChange={setDeadline} />

                {editing ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                            id="attempts"
                            type="number"
                            value={attempts}
                            onChange={(e) => setAttempts(Number(e.target.value))}
                            placeholder="Введите количество попыток"
                        />

                        <Input
                            id="timeLimit"
                            type="number"
                            value={timeLimit}
                            onChange={(e) => setTimeLimit(Number(e.target.value))}
                            placeholder="Введите время (в минутах)"
                        />
                    </div>
                ) : (
                    <div className="text-sm text-muted-foreground space-y-1">
                        <p>Попыток: <strong>{attempts}</strong></p>
                        <p>Времени на прохождение: <strong>{timeLimit} мин</strong></p>
                    </div>
                )}

                <AttachmentManager blockId={test.id} editing={editing} />

                {!editing && !started && (
                    <div className="flex justify-start">
                        <Button onClick={() => setStarted(true)}>
                            Начать попытку
                        </Button>
                    </div>
                )}

                {!editing && started && (
                    <StudentTestPreview testBlock={{
                        id: test.id,
                        questions,
                        timeLimit: timeLimit * 60,
                    }} />
                )}

                {editing && (
                    <EditableTestEditor
                        blockId={test.id}
                        initialQuestions={questions}
                        updateBlock={updateBlock}
                        currentContent = {test.content}
                    />
                )}
            </Card>
        </div>
    );
}

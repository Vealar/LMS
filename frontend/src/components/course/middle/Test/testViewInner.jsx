import { Card } from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";

import { useMeta } from "@/components/course/middle/commonElements/editableMetaForm.jsx";
import { EditableTitle } from "@/components/course/middle/commonElements/editableTitle.jsx";
import { EditableDescription } from "@/components/course/middle/commonElements/editableDescription.jsx";
import { EditableDeadline } from "@/components/course/middle/commonElements/editableDeadline.jsx";
import { AttachmentManager } from "@/components/course/middle/commonElements/attachmentManager.jsx";
import StudentTestPreview from "@/components/course/middle/Test/studentTestPreview.jsx";

export function TestViewInner({ test }) {
    const {
        title, setTitle,
        description, setDescription,
        deadline, setDeadline,
        attempts, setAttempts,
        timeLimit, setTimeLimit,
        editing,
    } = useMeta();

    return (
        <div className="w-full mx-auto px-6 mt-8 space-y-6">
            <Card className="rounded-xl p-6 bg-muted/50 space-y-6">
                <EditableTitle value={title} editing={editing} onChange={setTitle} />
                <EditableDescription value={description} editing={editing} onChange={setDescription} />
                <EditableDeadline value={deadline} editing={editing} onChange={setDeadline} />

                {editing ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="attempts">Количество попыток</Label>
                            <Input
                                id="attempts"
                                type="number"
                                min={1}
                                value={attempts}
                                onChange={(e) => setAttempts(Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <Label htmlFor="timeLimit">Ограничение по времени (мин)</Label>
                            <Input
                                id="timeLimit"
                                type="number"
                                min={1}
                                value={timeLimit}
                                onChange={(e) => setTimeLimit(Number(e.target.value))}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="text-sm text-muted-foreground space-y-1">
                        <p>Попыток: <strong>{attempts}</strong></p>
                        <p>Времени на прохождение: <strong>{timeLimit} мин</strong></p>
                    </div>
                )}
            </Card>

            <Card className="rounded-xl p-6 bg-muted/50 space-y-6">
                <AttachmentManager blockId={test.id} editing={editing} />

                {!editing && <StudentTestPreview testBlock={test} />}
            </Card>
        </div>
    );
}

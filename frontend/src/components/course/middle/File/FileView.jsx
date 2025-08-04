import { Card } from "@/components/ui/card";
import { useEditing } from "@/components/context/editingContext";
import { useCourseMutations } from "@/features/useCourseMutations";

import { EditableMetaForm } from "@/components/course/middle/commonElements/editableMetaForm.jsx";
import { EditableTitle } from "@/components/course/middle/commonElements/editableTitle.jsx";
import { useMeta } from "@/components/course/middle/commonElements/editableMetaForm.jsx";

import SingleFileAttachmentManager from "./SingleFileAttachmentManager";

export default function FileView({ fileBlock }) {
    const { editing } = useEditing();
    const { updateBlock } = useCourseMutations(fileBlock.courseId);

    return (
        <div className="w-full mx-auto px-6 mt-8">
            <Card className="rounded-xl p-6 bg-muted/50 space-y-4">
                <EditableMetaForm block={fileBlock} editing={editing} updateBlock={updateBlock}>
                    <FileEditor blockId={fileBlock.id} attachment={fileBlock.attachments?.[0]} />
                </EditableMetaForm>
            </Card>
        </div>
    );
}

function FileEditor({ blockId, attachment }) {
    const { title, setTitle, editing } = useMeta();

    return (
        <>
            <EditableTitle value={title} editing={editing} onChange={setTitle} />
            <SingleFileAttachmentManager blockId={blockId} attachment={attachment} editing={editing} />
        </>
    );
}

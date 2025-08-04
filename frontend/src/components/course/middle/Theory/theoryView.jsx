import {Card} from "@/components/ui/card.jsx";
import {useEditing} from "@/components/context/editingContext.jsx";
import {useCourseMutations} from "@/features/useCourseMutations.js";

import {EditableMetaForm} from "@/components/course/middle/commonElements/editableMetaForm.jsx";
import {EditableTitle} from "@/components/course/middle/commonElements/editableTitle.jsx";
import {EditableDescription} from "@/components/course/middle/commonElements/editableDescription.jsx";
import {AttachmentManager} from "@/components/course/middle/commonElements/attachmentManager.jsx";
import {useMeta} from "@/components/course/middle/commonElements/editableMetaForm.jsx";

export function TheoryMetaSection() {
    const {title, setTitle, description, setDescription, editing} = useMeta();

    return (
        <>
            <EditableTitle value={title} editing={editing} onChange={setTitle}/>
            <EditableDescription value={description} editing={editing} onChange={setDescription}/>
        </>
    );
}

export default function TheoryView({theory}) {
    const {editing} = useEditing();
    const {updateBlock} = useCourseMutations(theory.courseId);

    return (
        <div className="w-full mx-auto px-6 mt-8">
            <Card className="rounded-xl p-6 bg-muted/50 space-y-6">
                <EditableMetaForm block={theory} editing={editing} updateBlock={updateBlock}>
                    <TheoryMetaSection/>
                </EditableMetaForm>

                <AttachmentManager blockId={theory.id} editing={editing}/>
            </Card>
        </div>
    );
}

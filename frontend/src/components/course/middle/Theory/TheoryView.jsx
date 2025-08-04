import { Card } from "@/components/ui/card.jsx";
import { useEditing } from "@/components/context/editingContext.jsx";
import { useCourseMutations } from "@/features/useCourseMutations.js";
import {EditableMeta} from "@/components/course/middle/commonElements/EditableMeta.jsx";
import {AttachmentManager} from "@/components/course/middle/commonElements/AttachmentManager.jsx";

export default function TheoryView({ theory }) {
    const { editing } = useEditing();
    const { updateBlock } = useCourseMutations(theory.courseId);

    return (
        <div className="w-full mx-auto px-6 mt-8">
            <Card className="rounded-xl p-6 bg-muted/50 space-y-6">
                <EditableMeta block={theory} editing={editing} updateBlock={updateBlock} />
                <AttachmentManager blockId={theory.id} editing={editing} />
            </Card>
        </div>
    );
}

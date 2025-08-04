import { useEditing } from "@/components/context/editingContext.jsx";
import { useCourseMutations } from "@/features/useCourseMutations.js";
import { EditableMetaForm } from "@/components/course/middle/commonElements/editableMetaForm.jsx";
import { TestViewInner } from "@/components/course/middle/Test/testViewInner.jsx";

export default function TestView({ test }) {
    const { editing } = useEditing();
    const { updateBlock } = useCourseMutations(test.courseId);

    return (
        <EditableMetaForm block={test} editing={editing} updateBlock={updateBlock}>
            <TestViewInner test={test} />
        </EditableMetaForm>
    );
}

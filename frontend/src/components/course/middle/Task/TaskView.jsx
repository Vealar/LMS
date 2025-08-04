import {useCourseMutations} from "@/features/useCourseMutations.js";
import {useEditing} from "@/components/context/editingContext.jsx";
import {EditableMetaForm} from "@/components/course/middle/commonElements/EditableMetaForm.jsx";
import {TaskViewInner} from "@/components/course/middle/Task/TaskViewInner.jsx";

export default function TaskView({task}) {
    const {editing} = useEditing();
    const {updateBlock} = useCourseMutations(task.courseId);

    return (
        <EditableMetaForm block={task} editing={editing} updateBlock={updateBlock}>
            <TaskViewInner task={task}/>
        </EditableMetaForm>
    );
}

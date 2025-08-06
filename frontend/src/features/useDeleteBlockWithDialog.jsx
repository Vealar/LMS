import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useCourseMutations} from "@/features/useCourseMutations.js";
import DeleteBlockDialog from "@/components/course/middle/commonElements/deleteBlockDialog.jsx";

export function useDeleteBlockWithDialog(block) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const {deleteBlock} = useCourseMutations(block.courseId);

    const handleDelete = () => {
        setOpen(false);
        navigate(`/courses/1`);//TODO поменять на нормальный курс
        deleteBlock.mutate(block.id);
    };

    const renderDeleteButton = (editing) => {
        if (!editing) return null;

        return (
            <>
                <div className="flex justify-end">
                    <button
                        className="text-red-600 hover:underline text-sm"
                        onClick={() => setOpen(true)}
                    >
                        Удалить блок
                    </button>
                </div>
                <DeleteBlockDialog
                    open={open}
                    onOpenChange={setOpen}
                    onConfirm={handleDelete}
                />
            </>
        );
    };

    return {
        renderDeleteButton,
    };
}

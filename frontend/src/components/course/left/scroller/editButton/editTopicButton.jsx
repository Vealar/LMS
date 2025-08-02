import { PencilLine } from "lucide-react";
import { EditableContent } from "@/components/common/teacher/editableContent.jsx";

export function EditTopicButton({ onClick }) {
    return (
        <EditableContent>
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                }}
                className="p-1 ml-1 rounded transition-colors text-muted-foreground
                hover:text-foreground hover:bg-accent/50 focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                title="Редактировать тему"
            >
                <PencilLine className="w-4 h-4 transition-colors"/>
            </button>

        </EditableContent>
    );
}

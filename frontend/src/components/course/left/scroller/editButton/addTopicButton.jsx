import {Plus} from "lucide-react"
import {Button} from "@/components/ui/button"
import {EditableContent} from "@/components/common/teacher/editableContent.jsx";

export function AddTopicButton({onClick}) {
    return (
        <EditableContent>
            <div className="w-full flex justify-center mt-4">
                <Button
                    onClick={onClick}
                    variant="ghost"
                    className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground bg-transparent
                           hover:text-foreground hover:bg-primary/5 transition-colors"
                >
                    <div className="flex items-center gap-1.5">
                        <Plus className="w-4 h-4"/>
                        <span>Добавить тему</span>
                    </div>
                </Button>
            </div>
        </EditableContent>
    )
}

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.jsx";
import { Button } from "@/components/ui/button.jsx";
import { EditableContent } from "@/components/common/teacher/editableContent.jsx";
import { Plus } from "lucide-react";

const blockTypes = [
    ["Теория",'THEORY'],
    ["Файл",'FILE'],
    ["Тест",'TEST'],
    ["Задание",'TASK']
];
export function AddBlockButton({ topicId, onAddBlock }) {
    return (
        <EditableContent>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant="ghost"
                        className="w-full justify-start px-3 py-2 text-sm font-medium text-muted-foreground
                                   hover:text-foreground hover:bg-primary/5 transition-colors rounded-md"
                    >
                        <div className="flex items-center gap-1.5">
                            <Plus className="w-4 h-4" />
                            <span>Добавить блок</span>
                        </div>
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-48 space-y-1 p-2">
                    {blockTypes.map((type) => (
                        <Button
                            key={type[0]}
                            variant="ghost"
                            className="w-full justify-start text-sm"
                            onClick={() => onAddBlock(topicId, type[1])}
                        >
                            {type[0]}
                        </Button>
                    ))}
                </PopoverContent>
            </Popover>
        </EditableContent>
    );
}

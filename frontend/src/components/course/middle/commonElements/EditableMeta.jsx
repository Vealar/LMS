import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Button } from "@/components/ui/button.jsx";
import { toast } from "sonner";

export function EditableMeta({ block, editing, updateBlock }) {
    const [title, setTitle] = useState(block.title);
    const [description, setDescription] = useState(block.description || "");
    const [dirty, setDirty] = useState(false);

    useEffect(() => {
        setTitle(block.title);
        setDescription(block.description || "");
        setDirty(false);
    }, [block]);

    const handleSave = () => {
        updateBlock.mutate(
            { blockId: block.id, updates: { title, description } },
            {
                onSuccess: () => {
                    toast.success("Изменения сохранены");
                    setDirty(false);
                },
                onError: () => {
                    toast.error("Ошибка при сохранении");
                },
            }
        );
    };

    const handleChange = (setter) => (e) => {
        setter(e.target.value);
        setDirty(true);
    };

    return (
        <>
            {/* Название */}
            {editing ? (
                <Input value={title} onChange={handleChange(setTitle)} />
            ) : (
                <h1 className="text-2xl font-semibold">{title}</h1>
            )}

            {/* Описание */}
            <div>
                <h4 className="text-sm font-medium text-muted-foreground">Описание</h4>
                {editing ? (
                    <Textarea
                        value={description}
                        onChange={handleChange(setDescription)}
                        className="mt-1 min-h-[80px]"
                    />
                ) : (
                    <p className="text-sm mt-1 whitespace-pre-line">
                        {description || <span className="text-muted-foreground">Описание отсутствует</span>}
                    </p>
                )}
            </div>

            {/* Кнопка сохранения */}
            {editing && dirty && (
                <div className="flex justify-end mt-4">
                    <Button onClick={handleSave} disabled={!title.trim()}>
                        Сохранить изменения
                    </Button>
                </div>
            )}
        </>
    );
}

import { createContext, useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const MetaContext = createContext(null);

export function EditableMetaForm({ block, editing, updateBlock, children }) {
    const [title, setTitle] = useState(block.title);
    const [description, setDescription] = useState(block.description || "");
    const [deadline, setDeadline] = useState(block.deadline || null);
    const [dirty, setDirty] = useState(false);

    useEffect(() => {
        setTitle(block.title);
        setDescription(block.description || "");
        setDeadline(block.deadline || null);
        setDirty(false);
    }, [block]);

    const handleSave = () => {
        updateBlock.mutate(
            {
                blockId: block.id,
                updates: {
                    title,
                    description,
                    deadline: deadline === "" ? null : deadline,
                },
            },
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

    const context = {
        title,
        setTitle: (v) => {
            setTitle(v);
            setDirty(true);
        },
        description,
        setDescription: (v) => {
            setDescription(v);
            setDirty(true);
        },
        deadline,
        setDeadline: (v) => {
            setDeadline(v);
            setDirty(true);
        },
        editing,
        dirty,
    };

    return (
        <MetaContext.Provider value={context}>
            {children}

            {editing && dirty && (
                <div className="flex justify-end mt-4">
                    <Button onClick={handleSave} disabled={!title.trim()}>
                        Сохранить изменения
                    </Button>
                </div>
            )}
        </MetaContext.Provider>
    );
}

export const useMeta = () => useContext(MetaContext);

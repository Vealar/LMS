import { createContext, useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const MetaContext = createContext(null);

export function EditableMetaForm({ block, editing, updateBlock, children }) {
    const [title, setTitle] = useState(block.title);
    const [description, setDescription] = useState(block.description || "");
    const [deadline, setDeadline] = useState(block.deadline || null);
    const [dirty, setDirty] = useState(false);
    const [attempts, setAttempts] = useState(block.content?.attempts || 1);
    const [timeLimit, setTimeLimit] = useState(block.content?.timeLimit || 30);


    useEffect(() => {
        setTitle(block.title);
        setDescription(block.description || "");
        setDeadline(block.deadline || null);
        setAttempts(block.content?.attempts || 1);
        setTimeLimit(block.content?.timeLimit || 30);
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
                    content: {
                        ...block.content,
                        attempts,
                        timeLimit,
                    },
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
        attempts,
        setAttempts: (v) => {
            setAttempts(v);
            setDirty(true);
        },
        timeLimit,
        setTimeLimit: (v) => {
            setTimeLimit(v);
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

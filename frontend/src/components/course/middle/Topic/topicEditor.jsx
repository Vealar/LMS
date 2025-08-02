import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useTopicEditorMutations } from "@/features/useTopicEditorMutations.js";

export function TopicEditor({ topic, onClose, courseId }) {
    const [title, setTitle] = useState(topic.title);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteText, setDeleteText] = useState("");

    const { handleSaveTitle, handleDeleteTopic } = useTopicEditorMutations(courseId, onClose);

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Редактирование темы</DialogTitle>
                </DialogHeader>

                {!confirmDelete ? (
                    <>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Введите название темы"
                        />

                        <DialogFooter className="mt-4 flex justify-between">
                            <Button variant="destructive" onClick={() => setConfirmDelete(true)}>
                                Удалить тему
                            </Button>
                            <Button onClick={() => handleSaveTitle(topic.id, title)} disabled={!title.trim()}>
                                Сохранить
                            </Button>
                        </DialogFooter>
                    </>
                ) : (
                    <>
                        <p className="text-sm text-muted-foreground mb-2">
                            Напиши <span className="font-semibold">delete</span> в поле ниже для удаления темы и всех входящих в неё блоков.
                        </p>
                        <Input
                            value={deleteText}
                            onChange={(e) => setDeleteText(e.target.value)}
                            placeholder="delete"
                        />

                        <DialogFooter className="mt-4 flex justify-between">
                            <Button variant="ghost" onClick={() => setConfirmDelete(false)}>
                                Отмена
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => handleDeleteTopic(topic.id)}
                                disabled={deleteText !== "delete"}
                            >
                                Удалить
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}

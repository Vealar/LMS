import { useState, useRef } from "react";
import { Card } from "@/components/ui/card.jsx";
import { Paperclip, Trash2, Upload } from "lucide-react";
import { EditableContent } from "@/components/common/teacher/editableContent.jsx";
import { useAttachments } from "@/features/useAttachments.js";
import { Button } from "@/components/ui/button.jsx";
import { toast } from "sonner";

export default function TheoryView({ theory }) {
    const { id: blockId, title, description } = theory;
    const fileInputRef = useRef();

    const {
        attachments,
        isLoading,
        handleUpload,
        handleDelete,
    } = useAttachments(blockId);

    const handleFileChange = async (e) => {
        const files = e.target.files;
        if (!files.length) return;

        const formData = new FormData();
        Array.from(files).forEach((file) => {
            formData.append("files", file);
        });

        try {
            await handleUpload(formData);
            toast.success("Файлы успешно загружены");
        } catch {
            toast.error("Ошибка при загрузке файлов");
        }
    };

    return (
        <div className="w-full mx-auto px-6 mt-8">
            <Card className="rounded-xl p-6 bg-muted/50 space-y-6">
                <h1 className="text-2xl font-semibold">{title}</h1>

                <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Описание</h4>
                    <p className="text-sm mt-1 whitespace-pre-line">{description}</p>
                </div>

                <EditableContent>
                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => fileInputRef.current.click()}
                        >
                            <Upload className="w-4 h-4 mr-1" />
                            Загрузить файл
                        </Button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                </EditableContent>

                {/* Прикрепленные файлы */}
                {isLoading ? (
                    <p className="text-sm text-muted-foreground">Загрузка файлов...</p>
                ) : attachments?.length > 0 ? (
                    <div>
                        <h4 className="text-sm font-medium text-muted-foreground mt-4">Прикрепленные файлы</h4>
                        <ul className="text-sm space-y-2 mt-2">
                            {attachments.map((file) => (
                                <li key={file.id} className="flex items-center gap-2 justify-between">
                                    <div className="flex items-center gap-2">
                                        <Paperclip className="w-4 h-4" />
                                        <a
                                            href={file.url}
                                            className="underline"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {file.fileName}
                                        </a>
                                    </div>
                                    <EditableContent>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(file.id)}
                                            title="Удалить файл"
                                        >
                                            <Trash2 className="w-4 h-4 text-destructive" />
                                        </Button>
                                    </EditableContent>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">Файлы не прикреплены</p>
                )}
            </Card>
        </div>
    );
}

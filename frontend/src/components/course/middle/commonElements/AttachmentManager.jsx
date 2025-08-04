import { Button } from "@/components/ui/button.jsx";
import { Paperclip, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
    useBlockAttachments,
    useUploadBlockAttachments,
    useDeleteAttachment,
} from "@/features/useBlockAttachments.js";
import { openOrDownloadFile } from "@/components/common/openOrDownloadFile.js";

export function AttachmentManager({ blockId, editing }) {
    const {
        data: attachments = [],
        isLoading,
    } = useBlockAttachments(blockId);
    const upload = useUploadBlockAttachments(blockId);
    const remove = useDeleteAttachment(blockId);

    const handleFileUpload = (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const formData = new FormData();
        for (const file of files) {
            formData.append("files", file);
        }

        upload.mutate(formData, {
            onSuccess: () => toast.success("Файлы загружены"),
            onError: () => toast.error("Ошибка при загрузке"),
        });
    };

    const handleDelete = (id) => {
        remove.mutate(id, {
            onSuccess: () => toast.success("Файл удалён"),
            onError: () => toast.error("Ошибка при удалении файла"),
        });
    };

    return (
        <div>
            <h4 className="text-sm font-medium text-muted-foreground mt-4">Прикрепленные файлы</h4>

            {isLoading ? (
                <p className="text-sm mt-1">Загрузка...</p>
            ) : attachments.length === 0 ? (
                <p className="text-sm mt-1 text-muted-foreground">Файлы не прикреплены</p>
            ) : (
                <ul className="text-sm space-y-1 mt-1">
                    {attachments.map((file) => (
                        <li key={file.id} className="flex items-center justify-between gap-2">
                            <div
                                className="flex items-center gap-2 cursor-pointer underline"
                                onClick={() => openOrDownloadFile({ url: file.url, fileName: file.fileName })}
                            >
                                <Paperclip className="w-4 h-4" />
                                <span>{file.fileName}</span>
                            </div>

                            {editing && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-destructive"
                                    onClick={() => handleDelete(file.id)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            {editing && (
                <div className="mt-4">
                    <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    />
                </div>
            )}
        </div>
    );
}

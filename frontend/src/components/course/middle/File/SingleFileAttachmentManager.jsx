import { Button } from "@/components/ui/button";
import { Paperclip, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
    useUploadBlockAttachments,
    useDeleteAttachment,
} from "@/features/useBlockAttachments";

export default function SingleFileAttachmentManager({ blockId, attachment, editing }) {
    const upload = useUploadBlockAttachments(blockId);
    const remove = useDeleteAttachment(blockId);

    const handleUpload = (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const formData = new FormData();
        formData.append("files", files[0]); // только один файл

        upload.mutate(formData, {
            onSuccess: () => toast.success("Файл загружен"),
            onError: () => toast.error("Ошибка при загрузке файла"),
        });
    };

    const handleDelete = () => {
        if (!attachment?.id) return;
        remove.mutate(attachment.id, {
            onSuccess: () => toast.success("Файл удалён"),
            onError: () => toast.error("Ошибка при удалении файла"),
        });
    };

    return (
        <div>
            <h4 className="text-sm font-medium text-muted-foreground mt-4">Файл</h4>

            {attachment ? (
                <div className="flex items-center justify-between gap-2 mt-2">
                    <div className="flex items-center gap-2">
                        <Paperclip className="w-4 h-4" />
                        <a href={attachment.url} className="underline" target="_blank" rel="noreferrer">
                            {attachment.fileName}
                        </a>
                    </div>

                    {editing && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={handleDelete}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    )}
                </div>
            ) : (
                <p className="text-sm text-muted-foreground mt-1">Файл не прикреплён</p>
            )}

            {editing && !attachment && (
                <div className="mt-4">
                    <input
                        type="file"
                        onChange={handleUpload}
                        className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    />
                </div>
            )}
        </div>
    );
}

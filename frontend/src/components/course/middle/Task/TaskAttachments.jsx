import { Paperclip } from "lucide-react"

export default function TaskAttachments({ attachments }) {
    if (!attachments.length) return null

    return (
        <div>
            <h4 className="text-sm font-medium text-muted-foreground">Файлы задания</h4>
            <ul className="text-sm flex flex-wrap gap-2 mt-2">
                {attachments.map((file) => (
                    <li key={file.id}>
                        <a
                            href={file.url}
                            download={file.fileName}
                            className="flex items-center gap-2 px-3 py-1 bg-muted rounded hover:bg-muted/70 transition"
                        >
                            <Paperclip className="w-4 h-4" />
                            <span className="truncate max-w-[150px]">{file.fileName}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

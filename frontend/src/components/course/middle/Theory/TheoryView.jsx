import { Card } from "@/components/ui/card.jsx"
import { Paperclip } from "lucide-react"
import {EditableContent} from "@/components/common/teacher/editableContent.jsx";

export default function TheoryView({ theory }) {
    const {
        title,
        description,
        attachments,
    } = theory

    return (
        <div className="w-full mx-auto px-6 mt-8">
            <Card className="rounded-xl p-6 bg-muted/50 space-y-6">
                {/* Название */}
                <h1 className="text-2xl font-semibold">{title}</h1>

                {/* Описание */}
                <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Описание</h4>
                    <p className="text-sm mt-1 whitespace-pre-line">{description}</p>
                </div>

                {/* Прикрепленные файлы */}
                {attachments?.length > 0 && (
                    <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Прикрепленные файлы</h4>
                        <ul className="text-sm space-y-1 mt-1">
                            {attachments.map((file, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <Paperclip className="w-4 h-4" />
                                    <a href={file.url} className="underline" target="_blank" rel="noreferrer">
                                        {file.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </Card>
        </div>
    )
}

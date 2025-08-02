import { useState } from "react"
import { Button } from "@/components/ui/button.jsx"
import { Textarea } from "@/components/ui/textarea.jsx"
import { Label } from "@/components/ui/label.jsx"
import { X, UploadCloud } from "lucide-react"
import { cn } from "@/lib/utils.js"

export default function TaskSubmissionForm({ taskId, onSubmit }) {
    const [text, setText] = useState("")
    const [files, setFiles] = useState([])

    const handleFileChange = (e) => {
        const selected = Array.from(e.target.files)
        setFiles((prev) => [...prev, ...selected])
    }

    const handleDrop = (e) => {
        e.preventDefault()
        const droppedFiles = Array.from(e.dataTransfer.files)
        setFiles((prev) => [...prev, ...droppedFiles])
    }

    const handleDragOver = (e) => e.preventDefault()

    const handleRemoveFile = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("text", text)
        files.forEach((file) => formData.append("files", file))
        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="text" className="block mb-1">Ответ</Label>
                <Textarea
                    id="text"
                    placeholder="Введите ответ..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={6}
                />
            </div>

            <div>
                <Label className="block mb-2">Прикрепить файлы</Label>

                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className={cn(
                        "flex flex-col items-center justify-center border border-dashed border-muted-foreground rounded-xl p-6 cursor-pointer hover:bg-muted transition text-sm text-muted-foreground"
                    )}
                    onClick={() => document.getElementById("fileInput").click()}
                >
                    <UploadCloud className="w-6 h-6 mb-2" />
                    <p>Перетащите файлы сюда или нажмите, чтобы выбрать</p>
                    <input
                        id="fileInput"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.docx,.png,.jpg,.zip"
                    />
                </div>

                {files.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {files.map((file, index) => (
                            <div key={index} className="flex items-center px-3 py-1 rounded-full bg-muted text-sm">
                                <span className="truncate max-w-[160px]">{file.name}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveFile(index)}
                                    className="ml-2 text-muted-foreground hover:text-destructive"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Button type="submit">Отправить</Button>
        </form>
    )
}

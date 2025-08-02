import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog.jsx"

export default function ConfirmDialog({ open, onOpenChange, onCancel, onConfirm, data }) {
    if (!data) return null

    const files = data.getAll("files")
    const text = data.get("text")

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Подтвердите отправку</AlertDialogTitle>
                    <AlertDialogDescription asChild>
                        <div className="space-y-2 text-muted-foreground text-sm">
                            <div>
                                <strong>Ответ:</strong>
                                <div className="mt-1 whitespace-pre-wrap">{text}</div>
                            </div>
                            {files.length > 0 && (
                                <div>
                                    <strong>Файлы:</strong>
                                    <ul className="list-disc list-inside mt-1">
                                        {[...files].map((f, i) => (
                                            <li key={i}>{f.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onCancel}>Отмена</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>Отправить</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

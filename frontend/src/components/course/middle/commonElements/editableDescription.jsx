import { Textarea } from "@/components/ui/textarea";

export function EditableDescription({ value, editing, onChange }) {
    return (
        <div>
            <h4 className="text-sm font-medium text-muted-foreground">Описание</h4>
            {editing ? (
                <Textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="mt-1 min-h-[80px]"
                />
            ) : (
                <p className="text-sm mt-1 whitespace-pre-line">
                    {value || <span className="text-muted-foreground">Описание отсутствует</span>}
                </p>
            )}
        </div>
    );
}

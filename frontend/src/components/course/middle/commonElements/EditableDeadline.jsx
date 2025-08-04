import { Input } from "@/components/ui/input";

export function EditableDeadline({ value, editing, onChange }) {
    return (
        <div className="mt-2">
            <h4 className="text-sm font-medium text-muted-foreground">Дедлайн</h4>
            {editing ? (
                <Input
                    type="datetime-local"
                    value={value ? new Date(value).toISOString().slice(0, 16) : null}
                    onChange={(e) => onChange(new Date(e.target.value).toISOString())}
                    className="mt-1"
                />
            ) : value ? (
                <p className="text-sm text-muted-foreground mt-1">
                    {new Date(value).toLocaleString()}
                </p>
            ) : (
                <p className="text-sm text-muted-foreground mt-1">Не указан</p>
            )}
        </div>
    );
}

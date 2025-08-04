import { Input } from "@/components/ui/input";

export function EditableTitle({ value, editing, onChange }) {
    return editing ? (
        <Input value={value} onChange={(e) => onChange(e.target.value)} />
    ) : (
        <h1 className="text-2xl font-semibold">{value}</h1>
    );
}

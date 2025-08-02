import { useEditing } from "@/components/context/editingContext.jsx"

export function EditableContent({ children }) {
    const { editing } = useEditing();
    return editing ? children : null;
}

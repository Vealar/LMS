import { useAuth } from "@/components/context/authContext.jsx"

export function MaskContent({ children }) {
    const { user } = useAuth()
    if (user?.role === "TEACHER") return children
    return null
}

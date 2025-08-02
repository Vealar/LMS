import { Badge } from "@/components/ui/badge"

function getTimeLeft(deadline) {
    const now = new Date()
    const end = new Date(deadline)
    const diff = end - now

    if (diff <= 0) return "Срок истёк"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    const parts = []
    if (days > 0) parts.push(`${days} дн.`)
    if (hours > 0 || days > 0) parts.push(`${hours} ч`)
    parts.push(`${minutes} мин`)
    return parts.join(" ")
}

export default function TaskHeader({ title, deadline, status, grade }) {
    const renderStatus = () => {
        if (status === "PENDING") return <Badge variant="secondary">На проверке</Badge>
        if (status === "GRADED") return <Badge variant="default">Оценено: {grade}</Badge>
        return <Badge variant="outline">Не сдано</Badge>
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold">{title}</h1>

            {deadline && (
                <div className="mt-2 space-y-1">
                    <p className="text-xs text-muted-foreground">Осталось: {getTimeLeft(deadline)}</p>
                    <p className="text-sm text-muted-foreground">
                        Дедлайн: {new Date(deadline).toLocaleString()}
                    </p>
                </div>
            )}

            <div className="mt-3">{renderStatus()}</div>
        </div>
    )
}

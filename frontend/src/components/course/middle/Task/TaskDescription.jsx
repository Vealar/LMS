export default function TaskDescription({ description }) {
    return (
        <div>
            <h4 className="text-sm font-medium text-muted-foreground">Описание</h4>
            <p className="text-sm mt-1 whitespace-pre-line">{description}</p>
        </div>
    )
}

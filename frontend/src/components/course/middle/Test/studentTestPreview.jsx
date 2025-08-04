export default function StudentTestPreview({ testBlock }) {
    return (
        <div className="text-muted-foreground text-sm">
            <p>Это превью теста для студента (пока заглушка).</p>
            <p>Тест: <strong>{testBlock.title}</strong></p>
        </div>
    );
}

import { Card } from "@/components/ui/card.jsx"
import { Badge } from "@/components/ui/badge.jsx"
import { Button } from "@/components/ui/button.jsx"
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table.jsx"
import { Separator } from "@/components/ui/separator.jsx"

export default function TestView({ test }) {
    const {
        title,
        deadline,
        durationMinutes,
        maxAttempts,
        description,
        status,
        finalGrade,
        attempts = [],
    } = test

    return (
        <div className="w-full max-w-5xl mx-auto px-4 mt-8 space-y-6">
            <Card className="p-6 rounded-xl bg-muted/50">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Блок 1: Название, статус, время, попытки, кнопка */}
                    <div className="space-y-3">
                        <h1 className="text-2xl font-semibold">{title}</h1>
                        <p className="text-sm text-muted-foreground">Доступно до: {deadline}</p>
                        <div className="text-sm text-muted-foreground">
                            Время на прохождение: <strong>{durationMinutes} мин</strong><br />
                            Количество попыток: <strong>{maxAttempts}</strong>
                        </div>
                        {status === "COMPLETED" ? (
                            <Badge variant="default">Тест завершен</Badge>
                        ) : (
                            <Button variant="default">Начать тест</Button>
                        )}
                    </div>

                    {/* Блок 2: Описание */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground">Описание</h4>
                        <p className="text-sm whitespace-pre-line">{description}</p>
                    </div>
                </div>

                <Separator className="my-6" />

                {/* Блок 3: Итоговая оценка + История попыток */}
                <div className="space-y-4">
                    {finalGrade !== undefined && (
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Итоговая оценка</h4>
                            <p className="text-sm mt-1 font-semibold">{finalGrade}</p>
                        </div>
                    )}

                    {attempts.length > 0 && (
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-2">История попыток</h4>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Попытка</TableHead>
                                        <TableHead>Дата</TableHead>
                                        <TableHead>Баллы</TableHead>
                                        <TableHead>Оценка</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {attempts.map((attempt, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell>{idx + 1}</TableCell>
                                            <TableCell>{attempt.date}</TableCell>
                                            <TableCell>{attempt.score}</TableCell>
                                            <TableCell>{attempt.grade}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    )
}

import { Card } from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Switch } from "@/components/ui/switch.jsx";

export default function QuestionEditor({ question, onChange, onDelete }) {
    const handleOptionChange = (idx, field, value) => {
        const updatedOptions = [...question.options];

        if (field === "isCorrect" && value === true && question.type === "single") {
            // сбросить isCorrect у всех, кроме текущего
            updatedOptions.forEach((opt, i) => {
                updatedOptions[i] = { ...opt, isCorrect: i === idx };
            });
        } else {
            updatedOptions[idx] = { ...updatedOptions[idx], [field]: value };
        }

        onChange({ ...question, options: updatedOptions });
    };

    const handleAddOption = () => {
        const newOption = {
            id: crypto.randomUUID(),
            text: "",
            isCorrect: false,
        };
        onChange({ ...question, options: [...question.options, newOption] });
    };

    const handleDeleteOption = (idx) => {
        const updated = [...question.options];
        updated.splice(idx, 1);
        onChange({ ...question, options: updated });
    };

    return (
        <Card className="p-4 space-y-4 bg-muted/30">
            <div className="flex justify-between items-start">
                <Label className="font-medium text-lg">Вопрос</Label>
                <Button variant="destructive" size="sm" onClick={onDelete}>
                    Удалить
                </Button>
            </div>

            <Textarea
                value={question.text}
                placeholder="Введите текст вопроса"
                onChange={(e) => onChange({ ...question, text: e.target.value })}
            />

            <div className="flex items-center gap-2">
                <Label>Множественный выбор</Label>
                <Switch
                    checked={question.type === "multiple"}
                    onCheckedChange={(val) =>
                        onChange({
                            ...question,
                            type: val ? "multiple" : "single",
                            // сбрасываем все isCorrect при переключении на single
                            options: val
                                ? question.options
                                : question.options.map((opt) => ({ ...opt, isCorrect: false })),
                        })
                    }
                />
            </div>

            <div className="space-y-2">
                {question.options.map((option, idx) => (
                    <div key={option.id} className="flex gap-2 items-center">
                        <Input
                            value={option.text}
                            onChange={(e) => handleOptionChange(idx, "text", e.target.value)}
                            placeholder={`Вариант ${idx + 1}`}
                            className="flex-1"
                        />
                        <Label>Правильный</Label>
                        <input
                            type="checkbox"
                            checked={option.isCorrect}
                            onChange={(e) => handleOptionChange(idx, "isCorrect", e.target.checked)}
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => handleDeleteOption(idx)}
                        >
                            ✕
                        </Button>
                    </div>
                ))}
                <Button type="button" size="sm" onClick={handleAddOption}>
                    Добавить вариант
                </Button>
            </div>
        </Card>
    );
}

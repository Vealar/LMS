import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function TaskFeedback({ feedback }) {
    if (!feedback.length) return null

    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="feedback">
                <AccordionTrigger className="text-sm text-muted-foreground">
                    Комментарии преподавателя
                </AccordionTrigger>
                <AccordionContent className="text-sm space-y-3">
                    {feedback.map((fb) => (
                        <div key={fb.id}>
                            <p>{fb.text}</p>
                            {fb.author && (
                                <p className="text-xs text-muted-foreground mt-1">
                                    От: {fb.author.fullName} ({fb.author.role})
                                </p>
                            )}
                        </div>
                    ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function DeleteBlockDialog({ open, onOpenChange, onConfirm }) {
    const [confirmText, setConfirmText] = useState("");

    useEffect(() => {
        if (!open) setConfirmText("");
    }, [open]);

    const handleConfirm = async () => {
        await onConfirm();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-lg font-semibold">Удалить блок</h2>
                    <p className="text-sm text-muted-foreground">
                        Это действие необратимо. Для подтверждения введите <code>delete</code>.
                    </p>
                </DialogHeader>

                <Input
                    placeholder="Введите delete"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                />

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Отмена
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleConfirm}
                        disabled={confirmText !== "delete"}
                    >
                        Удалить
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

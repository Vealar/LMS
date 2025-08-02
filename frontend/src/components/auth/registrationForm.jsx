import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "@/api/authApi"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterForm({ className, ...props }) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setError("Пароли не совпадают")
            return
        }

        try {
            await register({
                email,
                password,
                fullName: `${firstName} ${lastName}`,
            })
            navigate("/login")
        } catch (err) {
            setError("Ошибка при регистрации. Возможно, email уже используется.")
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Регистрация</CardTitle>
                    <CardDescription>Создайте аккаунт LMS</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="firstName">Имя</Label>
                                <Input id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="lastName">Фамилия</Label>
                                <Input id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="password">Пароль</Label>
                                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                                <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                            </div>

                            {error && <div className="text-sm text-red-500">{error}</div>}

                            <Button type="submit" className="w-full">
                                Зарегистрироваться
                            </Button>

                            <div className="text-center text-sm">
                                Уже есть аккаунт?{" "}
                                <a href="/login" className="underline underline-offset-4">
                                    Войти
                                </a>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

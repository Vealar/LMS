import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "@/api/authApi"
import { useAuth } from "@/components/context/authContext"
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

export function LoginForm({ className, ...props }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { setUser } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const user = await login({ email, password })
            setUser(user)
            navigate("/courses/1")
        } catch (err) {
            setError("Неверный email или пароль")
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">С возвращением</CardTitle>
                    <CardDescription>Войдите в свой аккаунт LMS</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="m@edu.hse.ru"
                                    required
                                />
                            </div>

                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Пароль</Label>
                                    <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                                        Забыли пароль?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {error && <div className="text-sm text-red-500">{error}</div>}

                            <Button type="submit" className="w-full">
                                Войти
                            </Button>

                            <div className="text-center text-sm">
                                Нет аккаунта?{" "}
                                <a href="/register" className="underline underline-offset-4">
                                    Зарегистрироваться
                                </a>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

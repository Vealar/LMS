import { LoginForm } from "@/components/auth/loginForm.jsx"
import { RegisterForm } from "@/components/auth/registrationForm.jsx"

export default function AuthPage({ mode = "login" }) {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                {mode === "register" ? <RegisterForm /> : <LoginForm />}
            </div>
        </div>
    )
}

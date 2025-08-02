import {
    Sparkles,
    BadgeCheck,
    CreditCard,
    Bell,
    LogOut,
} from "lucide-react"

export const COURSE_RIGHT_SHEET_LINKS = [
    {
        icon: Sparkles,
        label: "Не знаю что тут",
        href: "/profile/upgrade",
    },
    {
        icon: BadgeCheck,
        label: "Что то будет",
        href: "/profile",
    },
    {
        icon: CreditCard,
        label: "Я верю",
        href: "/profile/billing",
    },
    {
        icon: Bell,
        label: "Думаю все таки верю",
        href: "/profile/notifications",
    },
]

export const COURSE_RIGHT_SHEET_LOGOUT = {
    icon: LogOut,
    label: "Выйти",
    onClick: () => {
        console.log("Logging out...")
    },
}

"use client"

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet.jsx"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar.jsx"

import {
    COURSE_RIGHT_SHEET_LINKS,
    COURSE_RIGHT_SHEET_LOGOUT
} from "@/constants/dataCourseRightSheet.js"

import { useState } from "react"
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/components/context/authContext.jsx";

export function CourseRightSheet({ user }) {
    const [open, setOpen] = useState(false)
    const { logoutUser } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logoutUser()
        navigate("/login")
        setOpen(false)
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <button className="rounded-full transition hover:opacity-80">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>AA</AvatarFallback>
                    </Avatar>
                </button>
            </SheetTrigger>

            <SheetContent
                side="right"
                className="w-[300px] sm:w-[300px] bg-white dark:bg-zinc-900 shadow-xl px-4 py-5 transition-transform duration-90 ease-out"
            >
                {/* Инфо о пользователе */}
                <div className="mb-4 flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-sm">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-muted-foreground text-xs">{user.email}</span>
                    </div>
                </div>

                {/* Ссылки */}
                <div className="space-y-1">
                    {COURSE_RIGHT_SHEET_LINKS.map(({ icon: Icon, label, href }) => (
                        <a
                            key={label}
                            href={href}
                            className="flex w-full items-center gap-2 p-2 hover:bg-muted rounded-md text-sm"
                        >
                            <Icon className="h-4 w-4" />
                            <span>{label}</span>
                        </a>
                    ))}
                </div>

                {/* Выход */}
                <div className="pt-4 border-t mt-4">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md text-sm"
                    >
                        <COURSE_RIGHT_SHEET_LOGOUT.icon className="h-4 w-4" />
                        <span>{COURSE_RIGHT_SHEET_LOGOUT.label}</span>
                    </button>
                </div>
            </SheetContent>
        </Sheet>
    )
}

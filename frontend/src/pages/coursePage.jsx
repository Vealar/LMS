import {useParams, Outlet} from "react-router-dom"
import {CourseAppSidebar} from "@/components/course/left/courseAppSidebar.jsx"
import {useCourseStructure} from "@/features/useCourseStructure.js"
import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import {Separator} from "@/components/ui/separator.jsx"
import {CourseRightSheet} from "@/components/course/right/courseRightSheet.jsx"
import {Switch} from "@/components/ui/switch.jsx";
import {Label} from "@/components/ui/label.jsx";
import {MaskContent} from "@/components/common/teacher/maskContent.jsx";
import {useEditing} from "@/components/context/editingContext.jsx";

const dataUser = {
    user: {
        name: "Александр",
        email: "avartemev_1@edu.hse.ru",
        avatar: "/avatars/shadcn.jpg",
    },
}

export default function CoursePage() {
    const {courseId} = useParams()
    const {data} = useCourseStructure(courseId)
    const {editing, setEditing} = useEditing()

    return (
        <SidebarProvider>
            <CourseAppSidebar items={data?.topics || []}/>
            <SidebarInset>
                <header
                    className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1"/>
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        Проектирование архитектуры программных систем
                    </div>

                    <div className="ml-auto flex items-center gap-4 pr-4">
                        <MaskContent>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="edit-mode"
                                    checked={editing}
                                    onCheckedChange={(value) => setEditing(value)}
                                />
                                <Label htmlFor="edit-mode">Режим редактирования</Label>
                            </div>
                        </MaskContent>
                        {/* TODO Тёмная тема + Профиль */}
                        {/*<button className="p-2 hover:bg-muted rounded-md transition">*/}
                        {/*    <Moon className="w-5 h-5"/>*/}
                        {/*</button>*/}
                        <CourseRightSheet user={dataUser.user}/>
                    </div>
                </header>

                <main className="p-6">
                    <Outlet/>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

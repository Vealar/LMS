import { SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar.jsx"
import { dataCourseTools } from "@/constants/dataCourseTools.js"
import {MaskContent} from "@/components/common/teacher/maskContent.jsx";
import { ClipboardList } from "lucide-react"

export function CourseTools() {
    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarMenu>
                {dataCourseTools.map((item) => (
                    <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton asChild>
                            <a href={item.url}>
                                <item.icon />
                                <span>{item.name}</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                <MaskContent>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a href="/course/1/review">
                                <ClipboardList />
                                <span>Проверка работ</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </MaskContent>
            </SidebarMenu>
        </SidebarGroup>
    )
}

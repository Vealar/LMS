import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
    SidebarSeparator,
} from "@/components/ui/sidebar.jsx";
import {CourseBlockTypeFilter} from "@/components/course/left/courseBlockTypeFilter.jsx";
import {CourseTools} from "@/components/course/left/courseTools.jsx";
import {CourseScroller} from "@/components/course/left/scroller/courseScroller.jsx";

export function CourseAppSidebar({ items }) {
    return (
        <Sidebar>
            <SidebarHeader>
                <CourseBlockTypeFilter/>
                <CourseTools/>
            </SidebarHeader>
            <SidebarContent>
                <SidebarSeparator className="mx-0" />
                <CourseScroller items={items} />

            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}

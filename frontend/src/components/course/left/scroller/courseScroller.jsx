import {
    SidebarGroup,
    SidebarMenu, SidebarMenuItem,
} from "@/components/ui/sidebar.jsx";

import { TopicItem } from "./TopicItem.jsx";
import {AddTopicButton} from "@/components/course/left/scroller/editButton/addTopicButton.jsx";

export function CourseScroller({ items, onEditTopic, onAddBlock }) {

    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map((topic) => (
                    <TopicItem
                        key={topic.id}
                        topic={topic}
                        onEditTopic={onEditTopic}
                        onAddBlock={onAddBlock}
                    />
                ))}
                <SidebarMenuItem>
                    <AddTopicButton onClick={()=>1} />
                </SidebarMenuItem>

            </SidebarMenu>
        </SidebarGroup>
    );
}

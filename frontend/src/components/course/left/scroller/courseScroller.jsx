import {SidebarGroup, SidebarMenu, SidebarMenuItem} from "@/components/ui/sidebar.jsx";
import {TopicItem} from "./TopicItem.jsx";
import {AddTopicButton} from "@/components/course/left/scroller/editButton/addTopicButton.jsx";
import {useCourseMutations} from "@/features/useCourseMutations.js";
import {useParams} from "react-router-dom";

export function CourseScroller({items, onEditTopic, onAddBlock}) {
    const {courseId} = useParams();
    const {addTopic} = useCourseMutations(courseId);

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
                    <AddTopicButton onClick={() => {
                        addTopic.mutate();
                    }}/>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
}

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible.jsx";

import {
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar.jsx";

import {ChevronRight} from "lucide-react";
import {EditTopicButton} from "./editButton/editTopicButton.jsx";
import {BlockList} from "./BlockList.jsx";
import {useNavigate, useParams} from "react-router-dom";

export function TopicItem({topic, onAddBlock}) {
    const navigate = useNavigate();
    const {courseId} = useParams();

    const handleEdit = () => {
        navigate(`/courses/${courseId}/topics/${topic.id}/edit`);
    };

    return (
        <Collapsible asChild defaultOpen className="group/collapsible">
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={topic.title} className="flex items-center gap-2">
                        <span className="flex-1 truncate text-left">{topic.title}</span>
                        <EditTopicButton onClick={handleEdit}/>
                        <ChevronRight
                            className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"/>
                    </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                    <BlockList topic={topic} onAddBlock={onAddBlock}/>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    );
}

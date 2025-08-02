import {
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar.jsx";

import { handleBlockClick } from "@/components/common/handleBlockClick.js";
import { AddBlockButton } from "./editButton/addBlockButton.jsx";
import { useNavigate } from "react-router-dom";

export function BlockList({ topic, onAddBlock }) {
    const navigate = useNavigate();

    return (
        <SidebarMenuSub>
            {(topic.blocks || []).map((block) => (
                <SidebarMenuSubItem key={`block-${block.id}`}>
                    <SidebarMenuSubButton
                        asChild
                        onClick={(e) => handleBlockClick(e, block, topic, navigate)}
                    >
                        <button type="button" className="w-full text-left">
                            <span>{block.title}</span>
                        </button>
                    </SidebarMenuSubButton>
                </SidebarMenuSubItem>
            ))}

            <AddBlockButton topicId={topic.id} onAddBlock={onAddBlock} />
        </SidebarMenuSub>
    );
}

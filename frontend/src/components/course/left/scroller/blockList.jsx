// BlockList.jsx
import {
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar.jsx";

import { handleBlockClick } from "@/components/common/handleBlockClick.js";
import { AddBlockButton } from "./editButton/addBlockButton.jsx";
import { useNavigate } from "react-router-dom";
import { useCourseMutations } from "@/features/useCourseMutations.js";
import { toast } from "sonner";

export function BlockList({ topic }) {
    const navigate = useNavigate();
    const { addBlock } = useCourseMutations(topic.courseId); // передай courseId внутрь topic или пропсами

    const handleAddBlock = (topicId, type) => {
        const defaultBlock = {
            title: type,
            type,
        };

        addBlock.mutate(
            { topicId, block: defaultBlock },
            {
                onSuccess: () => toast.success("Блок создан"),
                onError: () => toast.error("Ошибка при создании блока"),
            }
        );
    };

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

            <AddBlockButton topicId={topic.id} onAddBlock={handleAddBlock} />
        </SidebarMenuSub>
    );
}

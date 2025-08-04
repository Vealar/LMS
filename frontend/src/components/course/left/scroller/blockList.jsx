import {
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar.jsx";

import {useEditing} from "@/components/context/editingContext";

import {AddBlockButton} from "./editButton/addBlockButton.jsx";
import {useNavigate} from "react-router-dom";
import {useCourseMutations} from "@/features/useCourseMutations.js";
import {toast} from "sonner";

export function BlockList({topic}) {
    const navigate = useNavigate();
    const {addBlock} = useCourseMutations(topic.courseId);
    const {editing} = useEditing(); // ← вот тут берём состояние

    const handleAddBlock = (topicId, type) => {
        const defaultBlock = {
            title: type,
            type,
        };

        addBlock.mutate(
            {topicId, block: defaultBlock},
            {
                onSuccess: () => toast.success("Блок создан"),
                onError: () => toast.error("Ошибка при создании блока"),
            }
        );
    };
    const handleClick = (block) => {
        if (!editing && block.type === "FILE" && block.attachments?.[0]?.url) {
            const url = block.attachments[0].url;

            const link = document.createElement("a");
            link.href = url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.click();

            return;
        }

        //TODO настроить курс
        navigate(`/courses/${1}/topics/${topic.id}/blocks/${block.id}`);
    }


    return (
        <SidebarMenuSub>
            {(topic.blocks || []).map((block) => (
                <SidebarMenuSubItem key={`block-${block.id}`}>
                    <SidebarMenuSubButton asChild>
                        <button
                            type="button"
                            className="w-full text-left"
                            onClick={() => handleClick(block)}
                        >
                            <span>{block.title}</span>
                        </button>
                    </SidebarMenuSubButton>
                </SidebarMenuSubItem>
            ))}

            <AddBlockButton topicId={topic.id} onAddBlock={handleAddBlock}/>
        </SidebarMenuSub>
    );
}

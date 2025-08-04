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
import {openOrDownloadFile} from "@/components/common/openOrDownloadFile.js";

export function BlockList({topic}) {
    const navigate = useNavigate();
    const {addBlock} = useCourseMutations(topic.courseId);
    const {editing} = useEditing();

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

    const handleClick = (e, block) => {
        e.preventDefault();
        e.stopPropagation();

        if (!editing && block.type === "FILE" && block.attachments?.length > 0) {
            const file = block.attachments[0];
            openOrDownloadFile({url: file.url, fileName: file.fileName});
            return;
        }

        navigate(`/courses/${topic.courseId}/topics/${topic.id}/blocks/${block.id}`);
    };

    return (
        <SidebarMenuSub>
            {(topic.blocks || []).map((block) => (
                <SidebarMenuSubItem key={`block-${block.id}`}>
                    <SidebarMenuSubButton asChild>
                        <button
                            type="button"
                            className="w-full text-left"
                            onClick={(e) => handleClick(e, block)}
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

import * as React from "react"
import {ChevronsUpDown, GalleryVerticalEnd, Plus} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar.jsx"
import {BLOCK_TYPE_OPTIONS, getBlockTypeFilterLabel} from "@/constants/dataBlockTypeFilter.js";
import {Checkbox} from "@/components/ui/checkbox.jsx";

export function CourseBlockTypeFilter() {
  const { isMobile } = useSidebar()
  const [selectedTypes, setSelectedTypes] = React.useState(
      BLOCK_TYPE_OPTIONS.map((t) => t.id)
  )

  const toggleType = (id) => {
    setSelectedTypes((prev) =>
        prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    )
  }

  const label = getBlockTypeFilterLabel(selectedTypes)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          {/*Сам объект материалов*/}
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <div
                  className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Материалы</span>
                <span className="truncate text-xs">{label}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          {/*Контент выпадающий вниз*/}
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}>

            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Фильтр
            </DropdownMenuLabel>

            <div className="flex flex-col gap-2 px-2 pb-2">
              {BLOCK_TYPE_OPTIONS.map((block) => (
                  <label key={block.id} className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                        checked={selectedTypes.includes(block.id)}
                        onCheckedChange={() => toggleType(block.id)}
                    />
                    <span>{block.label}</span>
                  </label>
              ))}
            </div>

          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

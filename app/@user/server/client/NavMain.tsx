"use client"

import { ChevronRight } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { ICONS, type IconName } from "./IconMap"

// The NavItem type now references itself, allowing for infinite nesting
export type NavItem = {
  title: string;
  url: string;
  icon?: IconName;
  isActive?: boolean;
  items?: NavItem[]; // Changed from a simple object to NavItem[]
};

// Internal component that calls itself to render nested items
function RecursiveNavItem({ item }: { item: NavItem }) {
  const hasChildren = item.items && item.items.length > 0;
  const Icon = item.icon ? ICONS[item.icon] : null;

  // Base Case: If there are no children, render a simple link item
  if (!hasChildren) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton asChild tooltip={item.title}>
          <Link href={item.url} className="flex items-center w-full">
             {Icon && <Icon className="w-4 h-4" />}
             <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  // Recursive Step: If there are children, render a collapsible group
  return (
    <Collapsible
      asChild
      defaultOpen={item.isActive}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            {Icon && <Icon className="w-4 h-4" />}
            <span>{item.title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {/* Call this same component for each child */}
            {item.items?.map((child) => (
              <RecursiveNavItem key={child.title} item={child} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

export function NavMain({
  items,
  sideBarGroupLabel,
}: {
  items: NavItem[],
  sideBarGroupLabel?: string
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{sideBarGroupLabel}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <RecursiveNavItem key={item.title} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
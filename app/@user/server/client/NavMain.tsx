// @/app/@user/server/client/NavMain.tsx

"use client"

import { usePathname, useRouter } from 'next/navigation' 
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
import { ICONS, type IconName } from "./IconMap"

export type NavItem = {
  title: string;
  url: string;
  icon?: IconName;
  items?: NavItem[];
};

function RecursiveNavItem({ item }: { item: NavItem }) {
  const router = useRouter();
  const pathname = usePathname();

  const hasChildren = item.items && item.items.length > 0;
  const Icon = item.icon ? ICONS[item.icon] : null;

  // 1. The robust path with .trim()
  const itemPath = item.url.split('?')[0].trim();

  // 2. Logic for highlighting: an exact match (===)
  const isLinkExactlyActive = pathname === itemPath;

  // 3. Logic for keeping parent open: a partial match (startsWith)
  const isSectionActive = pathname.startsWith(itemPath);

  // 4. Class for text-only highlighting
  const activeClassNames = "data-[active=true]:text-blue-600 dark:data-[active=true]:text-blue-400";


  // Base Case: If there are no children
  if (!hasChildren) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          tooltip={item.title}
          // Use the EXACT match for highlighting
          data-active={isLinkExactlyActive}
          className={activeClassNames}
          onMouseEnter={() => router.prefetch(item.url)}
          onClick={() => router.push(item.url)}
        >
          {Icon && <Icon className="w-4 h-4" />}
          <span>{item.title}</span>
      </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  // Recursive Step: If there are children
  return (
    <Collapsible
      asChild
      // Use the SECTION match to keep the collapsible open
      defaultOpen={isSectionActive}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={item.title}
            // Use the EXACT match for highlighting
            data-active={isLinkExactlyActive}
            className={activeClassNames}
            onClick={() => router.push(item.url)}
          >
            {Icon && <Icon className="w-4 h-4" />}
            <span>{item.title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
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
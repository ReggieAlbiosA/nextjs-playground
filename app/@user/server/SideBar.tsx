import { 
  Calendar, 
  Home, 
  Inbox, 
  Search, 
  Settings, 
  FileCode, // Added for Codebase
  Network,  // Replacing Sitemap for Architecture
  Eye,       // Added for Preview
} from "lucide-react";
import Link from "next/link";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarHeader 
} from "@/components/ui/sidebar";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Menu items
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  // --- New items added below ---
  {
    title: "Codebase",
    url: "/codebase",
    icon: FileCode, // Using FileCode icon
  },
  {
    title: "Architecture",
    url: "/architecture",
    icon: Network, // Using Network icon
  },
  {
    title: "Preview",
    url: "/preview",
    icon: Eye, // Using Eye icon
  },
  // --- End of new items ---
];

// Logo Component
function SiteLogo() {
  return (
    <div className="flex items-center gap-2 px-2 pt-3 pb-2">
      {/* Logo Icon */}
      <div className="flex items-center gap-x-2">
        <svg
          version="1.0"
          className="dark:fill-white fill-black translate-y-[2px]"
          xmlns="http://www.w3.org/2000/svg"
          width="21.000000pt"
          height="21.000000pt"
          viewBox="0 0 156.000000 256.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,256.000000) scale(0.100000,-0.100000)"
            stroke="none"
          >
            <path d="M1556 2374 c-16 -9 -266 -191 -555 -404 -355 -262 -532 -399 -546
            -422 -18 -30 -20 -54 -23 -310 -2 -153 0 -278 5 -278 4 0 201 144 436 320 467
             349 467 349 518 294 24 -25 24 -26 27 -280 l3 -254 -25 -25 c-45 -45 -77 -35
             -206 60 -63 47 -121 85 -129 85 -8 0 -90 -57 -182 -126 -167 -125 -169 -127
             -169 -164 0 -52 12 -81 50 -118 29 -29 408 -325 488 -381 40 -28 98 -37 143
             -22 54 18 468 339 504 389 l30 44 3 690 c3 812 14 735 -121 835 -46 34 -96 67
             -111 73 -39 15 -106 12 -140 -6z"/>
          </g>
        </svg>
    
        <div className="flex gap-x-1 items-center text-[1.4rem]">
          <span className="font-bold">Next.js</span>
          <span className="font-light">Playground</span>
        </div>
      </div>
    </div>
  )
}


export function AppSidebar() {
  return (
    <Sidebar>
      {/* Logo Header */}
      <SidebarHeader className="py-1">
          <SiteLogo />
      </SidebarHeader>

      <SidebarContent >
        <Select>
          <SelectTrigger  className="w-full rounded-none !py-4">
            <SelectValue   placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Codebase</SelectItem>
            <SelectItem value="dark">Architecture</SelectItem>
            <SelectItem value="system">Preview</SelectItem>
          </SelectContent>
        </Select>

        <SidebarGroup className="pl-4">
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
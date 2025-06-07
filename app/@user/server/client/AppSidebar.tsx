// @/app/@user/server/SideBar.tsx

"use client";

import { useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FileCode, Network, Eye } from "lucide-react";

// --- CLIENT-SIDE COOKIE SETTER ---
const setCookie = (name: string, value: string, days: number = 30): void => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

// Select options for easy reference
const selectOptions = [
    { value: "codebase", icon: FileCode, label: "Codebase" },
    { value: "architecture", icon: Network, label: "Architecture" },
    { value: "preview", icon: Eye, label: "Preview" },
];

export function AppSidebar({
    children,
    logo,
    initialMode
}: {
    children: React.ReactNode,
    logo: React.ReactNode,
    initialMode: string
}) {
    const [selectedMode, setSelectedMode] = useState(initialMode);

    // When the mode changes, we now reload the page to get the new server-rendered links.
    const handleModeChange = (value: string) => {
        setSelectedMode(value);
        setCookie("sidebar-selected-mode", value, 30);
        // Reload the page to apply the new URL segments from the server
        window.location.reload();
    };

    return (
        <Sidebar className="border-r border-border/40">
            <SidebarHeader className="p-0">
                {logo}
            </SidebarHeader>

            <SidebarContent className="px-2">
                <div className="p-2 border-b border-border/40">
                    <Select value={selectedMode} onValueChange={handleModeChange}>
                        <SelectTrigger className="w-full transition-colors duration-200 h-11 border-border/60 hover:border-border focus:ring-2 focus:ring-blue-500/20">
                            <SelectValue placeholder="Select Mode" />
                        </SelectTrigger>
                        <SelectContent className="border-border/60">
                            {selectOptions.map((option) => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                    className="cursor-pointer"
                                >
                                    <div className="flex items-center gap-2">
                                        <option.icon className="w-4 h-4" />
                                        <span>{option.label}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                {children}
            </SidebarContent>
        </Sidebar>
    );
}

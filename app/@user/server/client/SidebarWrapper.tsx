// @/app/@user/client/SidebarWrapper.tsx
"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useMemo } from "react";
import type { NavItem } from "../client/NavMain"; 
import { AppSidebar } from "../client/AppSidebar"; 
import { NavMain } from "../client/NavMain";

// --- THE MODIFIED HELPER FUNCTION ---
const addModeToLinks = (items: NavItem[], mode: string): NavItem[] => {
    return items.map(item => {
        const newItem = { ...item };
        const baseUrl = item.url.split('?')[0].trim();
        const hasChildren = item.items && item.items.length > 0;

        if (hasChildren) {
            // This is a PARENT link.
            // Keep its URL clean and static.
            newItem.url = baseUrl;
            // However, we still need to process its children recursively.
            newItem.items = addModeToLinks(item.items ?? [], mode);
        } else {
            // This is a CHILD link.
            // Append the view mode to its URL.
            newItem.url = `${baseUrl}?view=${mode}`;    
        }
        
        return newItem;
    });
};

const setCookie = (name: string, value: string, days: number = 30): void => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;`;
};


interface SidebarWrapperProps {
    initialMode: string;
    logo: React.ReactNode;
    buildingItems: NavItem[];
    apiItems: NavItem[];
}

export function SidebarWrapper({ 
    initialMode, 
    logo, 
    buildingItems, 
    apiItems 
}: SidebarWrapperProps) {
    
    const router = useRouter();
    const pathname = usePathname();

    const [selectedMode, setSelectedMode] = useState(initialMode);

    const handleModeChange = (newMode: string) => {
        setSelectedMode(newMode);
        setCookie("sidebar-selected-mode", newMode, 30);
        router.prefetch(`${pathname}?view=${newMode}`);
    };

    const modifiedBuildingItems = useMemo(
        () => addModeToLinks(buildingItems, selectedMode),
        [buildingItems, selectedMode]
    );

    const modifiedApiItems = useMemo(
        () => addModeToLinks(apiItems, selectedMode),
        [apiItems, selectedMode]
    );

    return (
        <AppSidebar 
            logo={logo}
            selectedMode={selectedMode}
            onModeChange={handleModeChange}
        >
            <NavMain
                items={modifiedBuildingItems}
                sideBarGroupLabel="Building Your Application"
            />
            <NavMain
                items={modifiedApiItems}
                sideBarGroupLabel="API Reference"
            />
        </AppSidebar>
    );
}

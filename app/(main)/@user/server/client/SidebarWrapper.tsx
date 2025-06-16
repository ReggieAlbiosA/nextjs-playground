// @/app/@user/client/SidebarWrapper.tsx
"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useMemo } from "react";
import type { NavItem } from "./NavMain"; 
import { AppSidebar } from "./AppSidebar"; 
import { NavMain } from "./NavMain";

// --- THE MODIFIED HELPER FUNCTION ---
const addModeToLinks = (items: NavItem[], mode: string): NavItem[] => {
    return items.map(item => {
        const newItem = { ...item };
        // 1. Always get the clean base URL
        const baseUrl = item.url.split('?')[0].trim();
        const hasChildren = item.items && item.items.length > 0;

        // 2. Apply the view mode query parameter to EVERY item's URL
        newItem.url = `${baseUrl}?view=${mode}`;

        // 3. If it's a parent, simply recurse for its children
        if (hasChildren) {
            newItem.items = addModeToLinks(item.items ?? [], mode);
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
    // Correctly call the prefetch method with the target URL
    router.prefetch(`${pathname}?view=${newMode}`); 
    router.push(`${pathname}?view=${newMode}`);
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

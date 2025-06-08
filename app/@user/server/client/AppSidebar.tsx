// @/app/@user/server/client/AppSidebar.tsx

"use client";

// REMOVE useState from imports, you no longer need it here
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FileCode, Network, Eye } from "lucide-react";

// REMOVE the setCookie function, we moved it to the wrapper.

// Select options for easy reference
const selectOptions = [
    { value: "codebase", icon: FileCode, label: "Codebase" },
    { value: "architecture", icon: Network, label: "Architecture" },
    { value: "preview", icon: Eye, label: "Preview" },
];

export function AppSidebar({
    children,
    logo,
    selectedMode,     // NEW PROP
    onModeChange,     // NEW PROP
}: {
    children: React.ReactNode,
    logo: React.ReactNode,
    selectedMode: string, // NEW PROP
    onModeChange: (value: string) => void, // NEW PROP
}) {
    
    // REMOVE THIS STATE MANAGEMENT
    // const [selectedMode, setSelectedMode] = useState(initialMode);

    // REMOVE THIS FUNCTION
    // const handleModeChange = (value: string) => { ... };

    return (
        <Sidebar className="border-r border-border/40">
            <SidebarHeader className="p-0">
                {logo}
            </SidebarHeader>

            <SidebarContent className="px-2">
                <div className="p-2 border-b border-border/40">
                    {/* The Select component now uses the props for its value and handler */}
                    <Select value={selectedMode} onValueChange={onModeChange}>
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
                {/* The children (NavMain components) are now passed from the wrapper */}
                {children}
            </SidebarContent>
        </Sidebar>
    );
}
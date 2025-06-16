import {
  Route,
  RefreshCcw,
  Calendar,
  Search,
  Settings,
  FileCode,
  Network,
  Eye,
  // New Icons for Categories
  Blocks,
  Droplets,
  CodeXml,
  Files,
  FileJson2,
  type LucideIcon
} from "lucide-react";

// Define a type for the icon names for better type safety
export type IconName = "Route" | "RefreshCcw" | "Calendar" | "Search" | "Settings" | "FileCode" | "Network" | "Eye" | "Blocks" | "Droplets" | "CodeXml" | "Files" | "FileJson2";

// The map that links the string name to the actual component
export const ICONS: Record<IconName, LucideIcon> = {
  Route,
  RefreshCcw,
  Calendar,
  Search,
  Settings,
  FileCode,
  Network,
  Eye,
  // New Icons
  Blocks,
  Droplets,
  CodeXml,
  Files,
  FileJson2
};
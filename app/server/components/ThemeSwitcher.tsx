"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";

export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!mounted) {
    // Render a placeholder during SSR to avoid hydration mismatch
    return <div className="w-9 h-9"></div>;
  }

  const handleThemeSelect = (selectedTheme: string) => {
    setTheme(selectedTheme);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleDropdown}
        aria-label="Toggle theme"
        className="cursor-pointer"
      >
        {resolvedTheme === "dark" ? (
          <Sun size={54} />
        ) : (
          <Moon size={54} />
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 z-[200]  w-34 mt-2 primary-bg border rounded-md shadow-lg ">
          <div className="flex flex-col p-1 gap-y-1">
            <button
              onClick={() => handleThemeSelect("light")}
              className={`w-full text-left px-2 py-1 rounded cursor-pointer   hover:bg-zinc-500/20 transition-colors   `}
            >
              Light
            </button>
            <button
              onClick={() => handleThemeSelect("dark")}
              className={`w-full text-left px-2 py-1 rounded cursor-pointer   hover:bg-zinc-500/20 transition-colors
              `}
            >
              Dark
            </button>
            <button
              onClick={() => handleThemeSelect("system")}
              className={`w-full text-left px-2 py-1 rounded cursor-pointer  hover:bg-zinc-500/20 transition-colors
                  `} 
            >
              System
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
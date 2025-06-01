// components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component (e.g., from shadcn/ui)
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder or null during SSR to avoid hydration mismatch
    return <div className="w-9 h-9"></div>; // Or your preferred placeholder size
  }

  return (
    <Button
      variant="ghost" // Adjust variant as per your design system
      size="icon"     // Adjust size as per your design system
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="transition-colors secondary-text hover:primary-text"
    >
      {resolvedTheme === "dark" ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} />
      )}
    </Button>
  );
}
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, User, Settings, Loader2 } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState, useEffect, useRef } from "react";
import { getInitials } from "@/utils/stringUtils";
import { createPortal } from "react-dom";

type DebouncedFunction<F extends (...args: unknown[]) => void> = (...args: Parameters<F>) => void;

function debounce<F extends (...args: unknown[]) => void>(func: F, waitFor: number): DebouncedFunction<F> {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<F>) => {
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };
}

export default function UserProfile() {
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // --- Solution Start ---
  // Ref to hold the latest value of 'loading'
  const loadingRef = useRef(loading);

  // Effect to keep loadingRef.current in sync with the 'loading' state
  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);
  // --- Solution End ---

  const createPersistentOverlay = () => {
    // ... (rest of the function remains the same)
    const existingOverlay = document.getElementById('signout-overlay');
    if (existingOverlay) {
      existingOverlay.remove();
    }
    const overlay = document.createElement('div');
    overlay.id = 'signout-overlay';
    overlay.className = 'fixed inset-0 z-[9999] flex items-center justify-center secondary-bg backdrop-blur-sm';
    overlay.style.animation = 'fadeIn 0.3s ease-in-out';
    overlay.innerHTML = `
     <div class="flex flex-col items-center gap-4">
        <svg class="w-8 h-8 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 12a9 9 0 11-6.219-8.56" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Signing out...</span>
      </div>
    `;
    if (!document.getElementById('signout-styles')) {
      const style = document.createElement('style');
      style.id = 'signout-styles';
      style.textContent = `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }
    document.body.appendChild(overlay);
    return overlay;
  };

  const handleSignOut = async () => {
    // ... (rest of the function remains the same)
    let persistentOverlay: HTMLElement | null = null;
    await signOut({
      fetchOptions: {
        onRequest: () => {
          setLoading(true);
          persistentOverlay = createPersistentOverlay();
        },
        onSuccess: () => {
          localStorage.setItem(
            "auth-event",
            JSON.stringify({ event: "signed-out", timestamp: Date.now() })
          );
          window.location.replace("/");
        },
        onError: (ctx) => {
          setLoading(false);
          if (persistentOverlay) {
            persistentOverlay.remove();
          }
          toast.error(`Sign out failed: ${ctx.error.message}`);
        },
      },
    });
  };

  useEffect(() => {
    // ... (handleClickOutside and handleEscape effect remains the same)
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        triggerRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    // ... (handleResize effect remains the same)
    const handleResize = debounce(() => {
      if (window.innerWidth <= 640 && isMenuOpen) setIsMenuOpen(false);
    }, 150);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  // Cleanup persistent overlay on component unmount (in case of errors)
  useEffect(() => {
    return () => {
      // Only remove if we're not in a loading state (to avoid removing during normal signout)
      // Use the ref's current value which holds the latest 'loading' state
      if (!loadingRef.current) {
        const overlay = document.getElementById('signout-overlay');
        if (overlay) {
          overlay.remove();
        }
      }
    };
  }, []); // This effect's cleanup now correctly uses the latest 'loading' via ref,
          // and its dependency array remains empty for unmount-only execution.

  // ... (rest of the component remains the same)
  if (isPending) {
    return (
      <Avatar className="w-10 h-10">
        <Skeleton className="w-full h-full rounded-full bg-zinc-300/20 dark:bg-zinc-700/20" />
      </Avatar>
    );
  }

  if (!session?.user) return null;

  const userInitials = getInitials(session.user.name) || getInitials(session.user.email);

  return (
    <>
      {loading &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center secondary-bg backdrop-blur-sm animate-in fade-in duration-300">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="text-sm font-medium">Signing out...</span>
            </div>
          </div>,
          document.body
        )}

      <div className="relative">
        <button
          ref={triggerRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="overflow-hidden rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Avatar className="w-10 h-10">
            <AvatarImage src={session.user.image ?? undefined} alt={session.user.name ?? "User avatar"} />
            <AvatarFallback className="font-medium">{userInitials}</AvatarFallback>
          </Avatar>
        </button>

        {isMenuOpen && (
          <div ref={dropdownRef} className="absolute right-0 top-full mt-2 w-64 p-2 bg-background shadow-2xl border rounded-lg z-[100]"> {/* Added bg-background for theme adaptability */}
            <div className="p-3">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={session.user.image ?? undefined} alt={session.user.name ?? "User avatar"} className="object-cover" />
                  <AvatarFallback className="text-sm font-medium border">{userInitials}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1 min-w-0 space-y-1">
                  <p className="text-sm font-semibold truncate">{session.user.name || "User"}</p>
                  {session.user.email && <p className="text-xs truncate text-muted-foreground">{session.user.email}</p>} {/* Used text-muted-foreground */}
                </div>
              </div>
            </div>

            <hr className="my-2" />

            {[
              { label: "Profile", icon: User, onClick: () => toast.info("Profile page coming soon!") },
              { label: "Settings", icon: Settings, onClick: () => toast.info("Settings page coming soon!") },
            ].map(({ label, icon: Icon, onClick }) => (
              <button
                key={label}
                className="w-full p-3 text-left rounded-md hover:bg-muted group" // Used hover:bg-muted
                onClick={() => {
                  onClick();
                  setIsMenuOpen(false);
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 rounded-md bg-muted/50 group-hover:bg-muted"> {/* Adjusted background */}
                    <Icon className="w-4 h-4 text-foreground/80" /> {/* Used text-foreground/80 */}
                  </div>
                  <span className="text-sm font-medium text-foreground/90">{label}</span> {/* Used text-foreground/90 */}
                </div>
              </button>
            ))}

            <hr className="my-2" />

            <button
              onClick={() => {
                handleSignOut();
                setIsMenuOpen(false);
              }}
              disabled={loading}
              className="w-full p-3 text-left rounded-md hover:bg-red-500/10 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center space-x-3">
                <div className="p-1.5 rounded-md bg-red-500/10 group-hover:bg-red-500/20">
                  {loading ? (
                    <Loader2 className="w-4 h-4 text-red-500 animate-spin" />
                  ) : (
                    <LogOut className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <span className={`text-sm font-medium ${loading ? "text-red-500/80" : "text-red-500"}`}>
                  {loading ? "Signing out..." : "Sign out"}
                </span>
              </div>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
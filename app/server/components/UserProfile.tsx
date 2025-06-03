"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, User, Settings, Loader2 } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState, useEffect, useRef } from "react";
import { getInitials } from "@/utils/stringUtils";

// Define the User type for session.user
interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

type DebouncedFunction<F extends (...args: unknown[]) => void> = (...args: Parameters<F>) => void;

// Debounce function
function debounce<F extends (...args: unknown[]) => void>(func: F, waitFor: number): DebouncedFunction<F> {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  const debounced: DebouncedFunction<F> = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
  return debounced;
}

// Export the handleSignOut function for use in MobileMenu
export const handleSignOut = async (setIsLoggingOut?: (loading: boolean) => void) => {
  if (setIsLoggingOut) setIsLoggingOut(true);

  await signOut({
    fetchOptions: {
      onRequest: () => {
        if (setIsLoggingOut) setIsLoggingOut(true);
      },
      onSuccess: () => {
        localStorage.setItem(
          "auth-event",
          JSON.stringify({ event: "signed-out", timestamp: Date.now() })
        );
        window.location.replace("/");
      },
      onError: (ctx) => {
        if (setIsLoggingOut) setIsLoggingOut(false);
        toast.error(`Sign out failed: ${ctx.error.message}`);
      },
    },
  });
};

export default function UserProfile() {
  const { data: session, isPending } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const onSignOut = async () => {
    await handleSignOut(setIsLoggingOut);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
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
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
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
    const handleResize = () => {
      if (window.innerWidth <= 640 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    const debouncedHandleResize = debounce(handleResize, 150);
    window.addEventListener("resize", debouncedHandleResize);
    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleStorageEvent = (event: StorageEvent) => {
      if (
        event.key === "logout" ||
        (event.key === "auth-event" && JSON.parse(event.newValue || "{}").event === "signed-out")
      ) {
        if (!isLoggingOut) {
          window.location.replace("/");
        }
      }
    };
    window.addEventListener("storage", handleStorageEvent);
    return () => window.removeEventListener("storage", handleStorageEvent);
  }, [isLoggingOut]);

  if (isPending) {
    return (
      <Avatar className="w-10 h-10">
        <Skeleton className="w-full h-full rounded-full bg-zinc-300/20 dark:bg-zinc-700/20" />
      </Avatar>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <>
      {isLoggingOut && (
        <div className="fixed inset-0 z-[9999] w-screen h-screen flex items-center justify-center dark:bg-black bg-white backdrop-blur-sm animate-in fade-in duration-300">
          <div className="flex flex-col items-center gap-4 duration-500 delay-150">
            <Loader2 className="w-8 h-8 animate-spin primary-text" />
            <span className="text-sm font-medium primary-text">Signing Out...</span>
          </div>
        </div>
      )}

      <div className="relative">
        <button
          ref={triggerRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="overflow-hidden rounded-full cursor-pointer card-bg focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={session.user.image ?? undefined}
              alt={session.user.name ?? "User avatar"}
            />
            <AvatarFallback className="font-medium primary-text card-bg">
              {getInitials(session.user.name) || getInitials(session.user.email)}
            </AvatarFallback>
          </Avatar>
        </button>

        {isMenuOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 top-full mt-2 w-64 p-2 shadow-2xl card-bg border-divider border rounded-lg z-[100] primary-text"
          >
            <div className="p-3 font-normal">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={session.user.image ?? undefined}
                    alt={session.user.name ?? "User avatar"}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-sm font-medium border primary-text card-bg border-divider">
                    {getInitials(session.user.name) || getInitials(session.user.email)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1 min-w-0 space-y-1">
                  <p className="text-sm font-semibold leading-none truncate primary-text">
                    {session.user.name || "User"}
                  </p>
                  {session.user.email && (
                    <p className="text-xs leading-none truncate secondary-text">
                      {session.user.email}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <hr className="my-2 border-divider" />

            <button
              className="w-full p-3 text-left rounded-md cursor-pointer primary-text hover:bg-zinc-500/10 focus:secondary-bg group"
              onClick={() => {
                toast.info("Profile page coming soon!");
                setIsMenuOpen(false);
              }}
            >
              <div className="flex items-center w-full space-x-3">
                <div className="p-1.5 rounded-md bg-zinc-500/5 group-hover:bg-zinc-500/10">
                  <User className="w-4 h-4 secondary-text group-hover:primary-text" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Profile</span>
                </div>
              </div>
            </button>

            <button
              className="w-full p-3 text-left rounded-md cursor-pointer primary-text hover:bg-zinc-500/10 focus:secondary-bg group"
              onClick={() => {
                toast.info("Settings page coming soon!");
                setIsMenuOpen(false);
              }}
            >
              <div className="flex items-center w-full space-x-3">
                <div className="p-1.5 rounded-md bg-zinc-500/5 group-hover:bg-zinc-500/10">
                  <Settings className="w-4 h-4 secondary-text group-hover:primary-text" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Settings</span>
                </div>
              </div>
            </button>

            <hr className="my-2 border-divider" />

            <button
              onClick={() => {
                onSignOut();
                setIsMenuOpen(false);
              }}
              disabled={isLoggingOut}
              className="w-full p-3 text-left rounded-md cursor-pointer primary-text hover:bg-red-500/10 focus:bg-red-500/10 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center w-full space-x-3">
                <div className="p-1.5 rounded-md bg-red-500/10 group-hover:bg-red-500/20">
                  {isLoggingOut ? (
                    <Loader2 className="w-4 h-4 text-red-500 animate-spin" />
                  ) : (
                    <LogOut className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span
                    className={`text-sm font-medium ${
                      isLoggingOut ? "text-red-500/80" : "text-red-500"
                    }`}
                  >
                    {isLoggingOut ? "Signing out..." : "Sign out"}
                  </span>
                </div>
              </div>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
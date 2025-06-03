"use client";

import { Menu, BookText, Github, User, Settings, LogOut, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/stringUtils";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { signIn, signOut } from "@/lib/auth-client";

// Define the User type for sessionUser
interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

// Define props interface
interface MobileMenuProps {
  sessionUser: User | null;
}

export function MobileMenu({ sessionUser }: MobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const originalOverflowRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (originalOverflowRef.current === null) {
        originalOverflowRef.current = window.getComputedStyle(document.body).overflow;
      }

      if (isMenuOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = originalOverflowRef.current;
      }
    }
  }, [isMenuOpen]);

  const handleGithubSignInClick = async () => {
    await signIn.social(
      {
        provider: "github",
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onError: (ctx) => {
          setLoading(false);
          toast.error(`Sign-in failed: ${ctx.error.message}`);
        },
        onSuccess: () => {
          localStorage.setItem(
            "auth-event",
            JSON.stringify({ event: "signed-in", timestamp: Date.now() })
          );
        },
      }
    );
  };

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onRequest: () => {
          setLoading(true);
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
          toast.error(`Sign out failed: ${ctx.error.message}`);
        },
      },
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItemClassName: string =
    "w-full flex items-center space-x-3 px-3 py-4 text-sm primary-text hover:bg-gray-200 dark:hover:bg-black/20 cursor-pointer";
  const iconWrapperClassName: string = "p-1.5 rounded-md bg-zinc-500/10";

  return (
    <>
      {loading && (
        <div className="absolute inset-0 z-[9999] w-screen h-screen flex items-center dark:bg-black bg-white justify-center animate-in fade-in duration-300">
          <div className="flex flex-col items-center gap-4 duration-500 delay-150">
            <Loader2 className="w-8 h-8 animate-spin primary-text" />
            <span className="text-sm font-medium primary-text">
              Redirecting...
            </span>
          </div>
        </div>
      )}
      
      <Button
        variant="ghost"
        size="icon"
        className="cursor-pointer sm:hidden primary-text hover:accent-color focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        onClick={toggleMenu}
      >
        <Menu size={20} />
        <span className="sr-only">Open menu</span>
      </Button>
      {isMenuOpen && (
        <div className="absolute overflow-y-scroll 500 h-[calc(100vh-64px)] sm:h-screen inset-x-0 top-[4rem] sm:hidden z-[100] w-full">
          <div className="w-full shadow dark:shadow-[0px_1px_0_rgba(128,128,128,0.2)] flex flex-col justify-center primary-bg">
            {sessionUser && (
              <>
                <div className="px-3 py-3">
                  <div className="flex items-center gap-x-2">
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={sessionUser.image ?? undefined}
                        alt={sessionUser.name ?? "User avatar"}
                      />
                      <AvatarFallback className="font-medium primary-text card-bg">
                        {getInitials(sessionUser.name) ||
                          getInitials(sessionUser.email)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col flex-1 min-w-0">
                      <p className="text-sm font-semibold leading-none truncate primary-text">
                        {sessionUser.name || "User"}
                      </p>
                      {sessionUser.email && (
                        <p className="text-xs leading-none truncate secondary-text">
                          {sessionUser.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <hr className="border-divider" />
                <button
                  onClick={() => toast.info("Profile page coming soon!")}
                  className={menuItemClassName}
                >
                  <div className={iconWrapperClassName}>
                    <User size={16} className="secondary-text" />
                  </div>
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => toast.info("Settings page coming soon!")}
                  className={menuItemClassName}
                >
                  <div className={iconWrapperClassName}>
                    <Settings size={16} className="secondary-text" />
                  </div>
                  <span>Settings</span>
                </button>
                <hr className="border-divider" />
              </>
            )}
            <Link
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className={menuItemClassName}
            >
              <div className={iconWrapperClassName}>
                <BookText size={16} className="secondary-text" />
              </div>
              <span>Next.js Docs</span>
            </Link>
            <hr className="border-divider" />
            {!sessionUser ? (
              <button
                onClick={handleGithubSignInClick}
                disabled={loading}
                className={`${menuItemClassName} disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                {loading ? (
                  <Loader2 size={16} className="mr-3 animate-spin" />
                ) : (
                  <div className={iconWrapperClassName}>
                    <Github size={16} className="secondary-text" />
                  </div>
                )}
                <span>Continue with Github</span>
              </button>
            ) : (
              <button
                onClick={handleSignOut}
                disabled={loading}
                className={`${menuItemClassName} text-red-500 hover:bg-red-500/10 focus:text-red-500 focus:bg-red-500/10 disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                {loading ? (
                  <Loader2 size={16} className="mr-3 animate-spin" />
                ) : (
                  <div className={`${iconWrapperClassName} bg-red-500/10`}>
                    <LogOut size={16} className="text-red-500" />
                  </div>
                )}
                <span className="font-medium">Sign out</span>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
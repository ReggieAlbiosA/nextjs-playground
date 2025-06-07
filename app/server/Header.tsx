import Link from "next/link";
import { BookText } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SidebarTrigger } from "@/components/ui/sidebar";

import GithubSignInButton from "./client/GithubSignIn";
import UserProfile from "./client/UserProfile";
import { ThemeSwitcher } from "./client/ThemeSwitcher";
import { MobileMenu } from "./client/MobileMenu";

export async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between h-16 px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          {session?.user ? (
            <SidebarTrigger />
          ) : (
            <Link href="/" className="text-lg font-bold" aria-label="Next.js Playground Home">
              <span className="flex items-center gap-x-2">
                <svg
                  version="1.0"
                  className="dark:fill-white fill-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 256 256"
                  preserveAspectRatio="xMidYMid meet"
                  aria-hidden="true"
                >
                  <g
                    transform="translate(0,256) scale(0.1,-0.1)"
                    stroke="none"
                  >
                    <path d="M1556 2374c-16-9-266-191-555-404-355-262-532-399-546-422-18-30-20-54-23-310-2-153 0-278 5-278 4 0 201 144 436 320 467 349 467 349 518 294 24-25 24-26 27-280l3-254-25-25c-45-45-77-35-206 60-63 47-121 85-129 85-8 0-90-57-182-126-167-125-169-127-169-164 0-52 12-81 50-118 29-29 408-325 488-381 40-28 98-37 143-22 54 18 468 339 504 389l30 44 3 690c3 812 14 735-121 835-46 34-96 67-111 73-39 15-106 12-140-6z"/>
                  </g>
                </svg>
                <span className="text-[1.2rem] font-bold">Next.js</span>
                <span className="text-[1.2rem] font-light">Playground</span>
              </span>
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />

          <nav
            className="items-center hidden gap-3 sm:flex"
            aria-label="Primary"
          >
            <Link
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm transition-colors hover:text-foreground/80 px-2 py-1.5 rounded-md"
            >
              <BookText size={16} />
              <span>Docs</span>
            </Link>

            <div className="w-px h-6 border-l border-border" aria-hidden="true" />

            {!session?.user ? (
              <GithubSignInButton />
            ) : (
              <UserProfile />
            )}
          </nav>

          <div className="sm:hidden">
            <MobileMenu sessionUser={session?.user ?? null} />
          </div>
        </div>
      </div>
    </header>
  );
}

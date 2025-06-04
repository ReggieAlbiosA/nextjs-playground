// app/components/Header.tsx (or your file path)
import Link from "next/link";
import { BookText } from "lucide-react";
import { auth } from "@/lib/auth"; // Your Auth.js v5 setup
import { headers } from "next/headers";
import GithubSignInButton from "./components/GithubSignIn"; // Default export
import UserProfile from "./components/UserProfile"; // Default export
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { MobileMenu } from "./components/MobileMenu";

export async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(), // Use headers from Next.js Server Components
  }); // Or your correct way to get session in Server Component

  return (
    <header className="sticky top-0 z-40 w-full border-b primary-bg border-divider backdrop-blur-sm"> {/* z-40 to be below modal overlays z-[100] or z-[9999] */}
      <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-bold">  
          <span>Next.js Playground</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* ThemeSwitcher - Always visible */}
          <ThemeSwitcher />

              {/* Desktop Links & Auth - Visible on sm screens and up */}
              <div className="items-center hidden gap-3 sm:flex">
                <Link
                  href="https://nextjs.org/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm transition-colors px-2 py-1.5 rounded-md"
                >
                  <BookText size={16} />
                  <span>Docs</span>
                </Link>

                <div className="w-px h-6 border-l"></div>
                  {!session?.user ? (
                    <GithubSignInButton />
                  ) : (
                    <UserProfile />
                  )}
              </div>

              {/* Mobile Menu Trigger - Visible only on screens smaller than sm */}
              <div className="sm:hidden">
                <MobileMenu sessionUser={session?.user ?? null} />
              </div>

        </div>
      </div>
    </header>
  );
}
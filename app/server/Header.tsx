import Link from "next/link";
import { BookText } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import GithubSignIn from "../components/GithubSignIn";
import UserProfile from "../components/UserProfile";

export async function Header() {
  // Await the session properly
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b primary-bg border-divider backdrop-blur-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-bold primary-text">
          <span className="accent-color">Next.js Playground</span> 
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="secondary-text hover:primary-text flex items-center gap-1.5 text-sm transition-colors"
          >
            <BookText size={16} />
            <span className="hidden sm:inline">Docs</span>
          </Link>

          {/* Separator */}
          <div className="hidden w-px h-6 border-l sm:block border-divider"></div>

          {/* Conditional rendering based on session */}
          {!session?.user ? (
            <GithubSignIn />
          ) : (
            <UserProfile />
          )}
        </div>
      </div>
    </header>
  );
}
import Link from "next/link";
import { BookText, Github } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b primary-bg border-divider backdrop-blur-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-bold primary-text">
          {/* "Next.js" is styled with the accent color for branding */}
          <span className="accent-color">Next.js</span> Playground
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

          {/* This separator is visible on larger screens for better spacing */}
          <div className="hidden w-px h-6 border-l sm:block border-divider"></div>

          {/* This "Continue with Github" button is the primary call-to-action,
            styled to stand out as requested. It uses card-bg and a border.
            The link should point to your NextAuth.js or other auth provider's GitHub route.
          */}
          <Link
            href="/api/auth/github"
            className="card-bg primary-text flex items-center gap-2 rounded-md border border-divider px-3 py-1.5 text-sm font-medium transition-colors hover:bg-zinc-500/10"
          >
            <Github size={16} />
            <span className="hidden sm:inline">Continue with&nbsp;</span>Github
          </Link>
        </div>
      </div>
    </header>
  );
}
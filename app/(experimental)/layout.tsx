import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import "../globals.css";
import Script from "next/script";
import Link from "next/link";
import Test from "./experimenting-with-template/Test";

// * dependencies
import { ThemeProvider } from "next-themes";

const geistSans = Geist({                                               
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Playground",
  description: "A modern application built with Next.js.",
};

export default async function RootLayout({
  children,
  user,
}: Readonly<{
  children: React.ReactNode;
  user?: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>

      <head>
             <Script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
      >
        <ThemeProvider    
          attribute="class"
          defaultTheme="system" 
          enableSystem
          disableTransitionOnChange
        >
        <div className="flex flex-col min-h-screen"> {/* Ensures the layout can fill the screen height */}
          <header className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700 sm:px-6">
              <nav className="flex items-center space-x-4">
                <Link href="/experimenting-with-template" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">Home</Link>
                <Link href="/page-1" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">Page 1</Link>
                <Link href="/page-2" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">Page 2</Link>
              </nav>
              <div className="ml-4">
                <Test/>
              </div>
          </header>

          <main className="flex-grow p-4 sm:p-6"> {/* Allows main content to expand */}
            {children}
          </main>
        </div>

        </ThemeProvider>

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
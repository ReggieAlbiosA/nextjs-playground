import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";


// * dependencies
import { ThemeProvider } from "next-themes";
import { Toaster } from 'sonner'

// * server components
import { Header } from "./server/Header"; // Import the new Header

// * client components
import AuthSync from "./server/components/AuthSync";

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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Applying primary-bg here ensures the entire page background, 
        including overscroll areas, matches the theme.
      */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased primary-bg`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* The Header is placed inside the ThemeProvider to receive theme updates */}
          <Header />

          <AuthSync />
          
          <main className="container px-4 py-8 mx-auto sm:px-6 lg:px-8">
            {children}
          </main>

          <Toaster
            richColors  // Applies default styling for success, error, etc.
            position="bottom-right" // Or your preferred position
            theme="system" // Will adapt to light/dark mode based on system/next-themes
            closeButton // Optionally show a close button
            duration={5000} // Default duration for toasts
          />
        </ThemeProvider>

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
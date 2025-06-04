import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

// * dependencies
import { ThemeProvider } from "next-themes";
import { Toaster } from 'sonner'
import { auth } from "@/lib/auth";
import { headers, cookies } from "next/headers";


// * server components
import { Header } from "./server/Header";

// * client components
import AuthSync from "./server/components/AuthSync";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./@user/server/SideBar";

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
  user, // Only include if you have a @user parallel route folder
}: Readonly<{
  children: React.ReactNode;
  user?: React.ReactNode; // Made optional in case @user route doesn't exist
}>) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {!session?.user ? (
            // No sidebar for signed out users
            <div className="flex w-full min-h-screen">
              <div className="flex flex-col flex-1">
                <Header />
                
                <main className="container flex-1 px-4 py-8 mx-auto sm:px-6 lg:px-8">
                  {children}
                </main>
              </div>
            </div>
          ) : (
            // Sidebar layout for signed in users
            <SidebarProvider
             style={{
                "--sidebar-width": "17rem",
                "--sidebar-width-mobile": "14rem",
              } as React.CSSProperties}
              defaultOpen={defaultOpen}
              
            >
              <div className="flex w-full min-h-screen">
                <AppSidebar />
                
                <div className="flex flex-col flex-1">
                  <Header />
                  
                  <main className="container flex-1 px-4 py-8 mx-auto sm:px-6 lg:px-8">
                    {user || children} {/* Fallback to children if user route doesn't exist */}
                  </main>
                </div>
              </div>
            </SidebarProvider>
          )}

            <AuthSync />

            <Toaster
              richColors
              position="bottom-right"
              theme="system"
              closeButton
              duration={5000}
            />
        </ThemeProvider>

        <SpeedInsights /> 
        <Analytics />
      </body>
    </html> 
  );
}
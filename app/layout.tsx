import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Header } from "./server/Header"; // Import the new Header

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased primary-bg primary-text`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* The Header is placed inside the ThemeProvider to receive theme updates */}
          <Header />
          <main className="container px-4 py-8 mx-auto sm:px-6 lg:px-8">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
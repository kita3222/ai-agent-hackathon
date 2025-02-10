import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import type React from "react";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "TaskMaster",
  description: "A goal-oriented task management application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-white dark:bg-gray-900 font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col">
            <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 bg-opacity-95 backdrop-blur supports-[backdrop-filter]:bg-inherit">
              <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                  <a className="mr-6 flex items-center space-x-2" href="/">
                    <span className="hidden font-bold sm:inline-block ">
                      TaskMaster
                    </span>
                  </a>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                  <div className="w-full flex-1 md:w-auto md:flex-none">
                    <button className="inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-accent-foreground dark:hover:text-accent-foreground h-8 px-3 py-2 w-full justify-between md:w-auto">
                      <span className="hidden sm:inline-flex">検索...</span>
                      <span className="inline-flex sm:hidden">検索</span>
                      <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                        <span className="text-xs">⌘</span>K
                      </kbd>
                    </button>
                  </div>
                  <ThemeToggle />
                </div>
              </div>
            </header>
            <main className="flex-1">
              <div className="container relative">
                <div className="mx-auto py-6 lg:py-8">{children}</div>
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

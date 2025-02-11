import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/_components/theme-provider";
import type React from "react";
import { cn } from "@/app/_lib/utils";

import Header from "@/app/_components/layouts/header";
import Main from "@/app/_components/layouts/main";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "AiDo",
  description: "課題やタスクの先延ばし癖がある人向けのAIを用いたTODOアプリ",
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

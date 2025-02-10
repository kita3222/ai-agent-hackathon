"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import Logo from "@/components/logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 bg-opacity-95 backdrop-blur supports-[backdrop-filter]:bg-inherit">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/app/projects">
            <Logo />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Input placeholder="検索..." className="h-8" />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

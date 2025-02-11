"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import Logo from "@/components/logo";
import { AppBreadcrumb } from "./app-breadcrumb";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 bg-opacity-95 backdrop-blur supports-[backdrop-filter]:bg-inherit">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-2 md:gap-4">
          <a className="flex items-center space-x-2" href="/app/projects">
            <Logo />
          </a>
          <div className="hidden md:block h-4 w-px bg-gray-200 dark:bg-gray-700" />
          <AppBreadcrumb />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="w-full max-w-[200px]">
            <Input placeholder="検索..." className="h-8" />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/_components/ui/breadcrumb";
import React from "react";

const routes = {
  "/app/projects": "プロジェクト一覧",
  "/app/projects/new": "新規プロジェクト",
  "/app/projects/suggest": "タスク設定",
  "/app/projects/schedule": "スケジュール設定",
};

export function AppBreadcrumb() {
  const pathname = usePathname();

  // プロジェクト一覧ページの場合は何も表示しない
  if (pathname === "/app/projects") {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);
  const relevantSegments = segments.slice(segments.indexOf("projects"));

  const crumbs = relevantSegments.map((segment, index) => {
    const path = `/${segments
      .slice(0, segments.indexOf("projects") + index + 1)
      .join("/")}`;
    const isProjectId = segment.match(/^[0-9a-fA-F-]+$/);
    const label = isProjectId
      ? "プロジェクト詳細"
      : routes[path as keyof typeof routes];

    return {
      path,
      label: label || segment,
      isLast: index === relevantSegments.length - 1,
    };
  });

  return (
    <Breadcrumb className="overflow-hidden">
      <BreadcrumbList className="flex-nowrap text-xs">
        {crumbs.map((crumb, index) => (
          <React.Fragment key={crumb.path}>
            {index > 0 && (
              <BreadcrumbSeparator className="[&>svg]:h-2.5 [&>svg]:w-2.5 flex-shrink-0" />
            )}
            <BreadcrumbItem className="overflow-hidden">
              {crumb.isLast ? (
                <BreadcrumbPage className="truncate text-xs">
                  {crumb.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={crumb.path} className="truncate text-xs">
                    {crumb.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

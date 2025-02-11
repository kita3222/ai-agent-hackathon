"use client";

import React from "react";
import {
  ArrowRightIcon,
  Book,
  Briefcase,
  GraduationCap,
  Rocket,
  PlusIcon,
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/app/_components/ui/card";
import { Progress } from "@/app/_components/ui/progress";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import SectionHeader from "@/app/_components/layouts/section-header";

export type Project = {
  id: string;
  title: string;
  description: string;
  type: "personal" | "work" | "learning" | "health";
  status: "not-started" | "in-progress" | "completed" | "struggling";
  target: {
    value: number;
    unit: string;
    date: string;
  };
  progress: number;
  icon: "book" | "briefcase" | "graduation-cap" | "rocket" | JSX.Element;
};

type PresentationalProps = {
  projects: Project[];
};

function ProjectIcon({ icon }: { icon: Project["icon"] }) {
  if (React.isValidElement(icon)) {
    return icon;
  }
  switch (icon) {
    case "book":
      return <Book className="h-4 w-4" />;
    case "briefcase":
      return <Briefcase className="h-4 w-4" />;
    case "graduation-cap":
      return <GraduationCap className="h-4 w-4" />;
    case "rocket":
      return <Rocket className="h-4 w-4" />;
    default:
      return null;
  }
}

function StatusBadge({ status }: { status: Project["status"] }) {
  const variants = {
    "not-started": "bg-slate-100 text-slate-700",
    "in-progress": "bg-blue-50 text-blue-700",
    completed: "bg-green-50 text-green-700",
    struggling: "bg-red-50 text-red-700",
  };

  const labels = {
    "not-started": "未着手",
    "in-progress": "進行中",
    completed: "完了",
    struggling: "苦戦中",
  };

  return (
    <Badge
      variant="secondary"
      className={`${variants[status]} border-0 text-xs`}
    >
      {labels[status]}
    </Badge>
  );
}

export default function Presentational({ projects }: PresentationalProps) {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-4">
      <SectionHeader
        title="プロジェクト一覧"
        button={
          <Button size="sm" startIcon={<PlusIcon />} asChild>
            <Link href="/app/projects/new">新規作成</Link>
          </Button>
        }
      />
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {projects.map((goal) => (
          <Card key={goal.id} className="relative overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="p-1.5 bg-slate-100 rounded-md dark:bg-slate-800">
                  <ProjectIcon icon={goal.icon} />
                </div>
                <StatusBadge status={goal.status} />
              </div>

              <h3 className="font-semibold text-base mb-0.5">{goal.title}</h3>
              <p className="text-xs text-muted-foreground mb-3">
                {goal.description}
              </p>

              <div className="space-y-2.5">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>進捗</span>
                    <span className="font-medium">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-1.5" />
                </div>

                <div className="flex justify-between items-baseline">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Book className="h-3 w-3 mr-1" />
                    期限:{" "}
                    {new Date(goal.target.date).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-2 border-t border-gray-200 dark:border-gray-700 flex items-center justify-center">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="w-full text-xs font-medium text-gray-700 dark:text-gray-400"
                endIcon={
                  <ArrowRightIcon className="w-4 h-4 text-gray-700 dark:text-gray-400" />
                }
              >
                <Link href={`/app/projects/${goal.id}`}>詳細を確認</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

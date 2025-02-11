"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import {
  AlertTriangle,
  Sparkles,
  AlertCircle,
  Bot,
  ListTodo,
  Target,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { GanttChart } from "@/components/gantt-chart";
import { useToast } from "@/components/ui/use-toast";

type Task = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  completed: boolean;
};

type Milestone = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  color: string;
  tasks: Task[];
};

type ProjectData = {
  title: string;
  description: string;
  deadline: string;
  milestones: Milestone[];
};

type Suggestion = {
  id: string;
  type: "warning" | "info" | "improvement";
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
};

type PresentationalProps = {
  projectData: ProjectData;
  suggestions: Suggestion[];
  overallProgress: number;
  toggleTaskCompletion: (
    milestoneId: string,
    taskId: string
  ) => Promise<{ success?: boolean; error?: string }>;
};

function getSuggestionStyles(type: Suggestion["type"]) {
  switch (type) {
    case "warning":
      return {
        card: "border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950",
        icon: "text-yellow-600 dark:text-yellow-400",
        text: "text-yellow-800 dark:text-yellow-200",
        description: "text-yellow-700 dark:text-yellow-300",
        primaryButton:
          "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-800",
        secondaryButton:
          "text-yellow-700 hover:bg-yellow-100 dark:text-yellow-300 dark:hover:bg-yellow-900",
      };
    case "info":
      return {
        card: "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950",
        icon: "text-blue-600 dark:text-blue-400",
        text: "text-blue-800 dark:text-blue-200",
        description: "text-blue-700 dark:text-blue-300",
        primaryButton:
          "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800",
        secondaryButton:
          "text-blue-700 hover:bg-blue-100 dark:text-blue-300 dark:hover:bg-blue-900",
      };
    case "improvement":
      return {
        card: "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950",
        icon: "text-green-600 dark:text-green-400",
        text: "text-green-800 dark:text-green-200",
        description: "text-green-700 dark:text-green-300",
        primaryButton:
          "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800",
        secondaryButton:
          "text-green-700 hover:bg-green-100 dark:text-green-300 dark:hover:bg-green-900",
      };
  }
}

const getSuggestionIcon = (type: Suggestion["type"]) => {
  switch (type) {
    case "warning":
      return <AlertTriangle className="h-5 w-5 flex-shrink-0" />;
    case "improvement":
      return <Sparkles className="h-5 w-5 flex-shrink-0" />;
    case "info":
      return <AlertCircle className="h-5 w-5 flex-shrink-0" />;
  }
};

export default function Presentational({
  projectData,
  suggestions,
  overallProgress,
  toggleTaskCompletion,
}: PresentationalProps) {
  const { toast } = useToast();
  const [loadingTasks, setLoadingTasks] = useState<string[]>([]);

  const handleToggleTask = async (milestoneId: string, taskId: string) => {
    try {
      setLoadingTasks((prev) => [...prev, taskId]);
      const result = await toggleTaskCompletion(milestoneId, taskId);

      if (result.error) {
        toast({
          title: "エラー",
          description: result.error,
          variant: "destructive",
        });
      }
    } finally {
      setLoadingTasks((prev) => prev.filter((id) => id !== taskId));
    }
  };

  return (
    <div className="space-y-8">
      {/* AIからの提案 */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-primary" />
          <h2 className="text-md font-medium">AIからの提案</h2>
        </div>
        <div className="grid gap-2"></div>
        <div className="grid gap-2">
          {suggestions.map((suggestion) => {
            const styles = getSuggestionStyles(suggestion.type);
            return (
              <Card
                key={suggestion.id}
                className={`p-3 border rounded-md ${styles.card}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={styles.icon}>
                    {getSuggestionIcon(suggestion.type)}
                  </div>
                  <span className={`font-medium ${styles.text}`}>
                    {suggestion.title}
                  </span>
                </div>
                <p className={`text-sm ${styles.description}`}>
                  {suggestion.description}
                </p>
                <div className="flex gap-2 mt-2">
                  {suggestion.primaryAction && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={suggestion.primaryAction.onClick}
                      className={styles.primaryButton}
                    >
                      {suggestion.primaryAction.label}
                    </Button>
                  )}
                  {suggestion.secondaryAction && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={suggestion.secondaryAction.onClick}
                      className={styles.secondaryButton}
                    >
                      {suggestion.secondaryAction.label}
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* タスク一覧 */}
      <Card>
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ListTodo className="h-5 w-5 text-primary" />
              <CardTitle>タスクの進捗状況</CardTitle>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>目標期限:</span>
              <span className="font-medium">
                {format(new Date(projectData.deadline), "yyyy年MM月dd日")}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* 全体の進捗 */}
            <div className="space-y-2 border-b pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-medium">全体の進捗</h3>
                </div>
                <span className="text-sm text-muted-foreground">
                  {overallProgress}% 完了
                </span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>

            {/* マイルストーンごとの進捗 */}
            <div className="grid gap-6">
              {projectData.milestones.map((milestone) => (
                <div key={milestone.id} className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${milestone.color}`}
                        />
                        <h3 className="text-base font-medium">
                          {milestone.title}
                        </h3>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {format(milestone.startDate, "MM/dd")} -{" "}
                        {format(milestone.endDate, "MM/dd")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>{milestone.progress}% 完了</span>
                    </div>
                    <Progress value={milestone.progress} className="h-1.5" />
                  </div>

                  <div className="grid gap-2 pl-4">
                    {milestone.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={task.completed}
                            onCheckedChange={() =>
                              handleToggleTask(milestone.id, task.id)
                            }
                            disabled={loadingTasks.includes(task.id)}
                          />
                          <span className="text-sm">{task.title}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {format(task.startDate, "MM/dd")} -{" "}
                          {format(task.endDate, "MM/dd")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ガントチャート */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <CardTitle>ガントチャート</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6 overflow-x-auto">
          <GanttChart
            startDate={projectData.milestones[0].startDate}
            endDate={new Date(projectData.deadline)}
            milestones={projectData.milestones}
          />
        </CardContent>
      </Card>
    </div>
  );
}

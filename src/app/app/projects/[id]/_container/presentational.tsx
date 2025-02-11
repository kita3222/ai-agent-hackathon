"use client";

import React from "react";
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
import { Progress } from "@/app/_components/ui/progress";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { GanttChart } from "@/app/_components/gantt-chart";

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
  toggleTaskCompletion: (milestoneId: string, taskId: string) => void;
};

export default function Presentational({
  projectData,
  suggestions,
  overallProgress,
  toggleTaskCompletion,
}: PresentationalProps) {
  return (
    <div className="space-y-8">
      {/* AIからの提案 */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-medium">AIからの提案</h2>
        </div>
        <div className="grid gap-2">
          {suggestions.map((suggestion) => (
            <Card key={suggestion.id} className="p-3 border rounded-md">
              <div className="flex items-center gap-2 mb-1">
                {suggestion.type === "warning" && (
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                )}
                {suggestion.type === "improvement" && (
                  <Sparkles className="h-5 w-5 text-blue-600" />
                )}
                {suggestion.type === "info" && (
                  <AlertCircle className="h-5 w-5 text-purple-600" />
                )}
                <span className="font-medium">{suggestion.title}</span>
              </div>
              <p className="text-sm">{suggestion.description}</p>
              <div className="flex gap-2 mt-2">
                {suggestion.primaryAction && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={suggestion.primaryAction.onClick}
                  >
                    {suggestion.primaryAction.label}
                  </Button>
                )}
                {suggestion.secondaryAction && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={suggestion.secondaryAction.onClick}
                  >
                    {suggestion.secondaryAction.label}
                  </Button>
                )}
              </div>
            </Card>
          ))}
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
                              toggleTaskCompletion(milestone.id, task.id)
                            }
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

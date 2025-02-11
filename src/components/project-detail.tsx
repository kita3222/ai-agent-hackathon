"use client";

import { useParams } from "next/navigation";
import { format } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { GanttChart } from "./gantt-chart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertCircle,
  Bot,
  CalendarIcon,
  CheckCircle2,
  Clock,
  ListTodo,
  Target,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const COLORS = [
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
];

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

export default function ProjectDetail() {
  const { id } = useParams();
  const [projectData, setProjectData] = useState({
    title: "GOAL-1",
    description: "研究論文を完成させる",
    deadline: "2024-05-12",
    milestones: [
      {
        id: "1",
        title: "先行研究のレビュー",
        startDate: new Date("2024-02-11"),
        endDate: new Date("2024-03-13"),
        progress: 0,
        color: COLORS[0],
        tasks: [
          {
            id: "1-1",
            title: "関連論文の収集",
            startDate: new Date("2024-02-11"),
            endDate: new Date("2024-02-26"),
            completed: false,
          },
          {
            id: "1-2",
            title: "論文の要約と分析",
            startDate: new Date("2024-02-27"),
            endDate: new Date("2024-03-13"),
            completed: false,
          },
        ],
      },
      {
        id: "2",
        title: "データ収集と分析",
        startDate: new Date("2024-03-14"),
        endDate: new Date("2024-04-12"),
        progress: 0,
        color: COLORS[1],
        tasks: [
          {
            id: "2-1",
            title: "データ収集方法の決定",
            startDate: new Date("2024-03-14"),
            endDate: new Date("2024-03-20"),
            completed: false,
          },
          {
            id: "2-2",
            title: "データの収集と整理",
            startDate: new Date("2024-03-21"),
            endDate: new Date("2024-04-05"),
            completed: false,
          },
        ],
      },
      {
        id: "3",
        title: "論文執筆と校正",
        startDate: new Date("2024-04-13"),
        endDate: new Date("2024-05-12"),
        progress: 0,
        color: COLORS[2],
        tasks: [
          {
            id: "3-1",
            title: "論文の構成決定",
            startDate: new Date("2024-04-13"),
            endDate: new Date("2024-04-20"),
            completed: false,
          },
          {
            id: "3-2",
            title: "各セクションの執筆",
            startDate: new Date("2024-04-21"),
            endDate: new Date("2024-05-05"),
            completed: false,
          },
        ],
      },
    ],
  });

  // AIの提案データ
  const [suggestions] = useState<Suggestion[]>([
    {
      id: "1",
      type: "warning",
      title: "スケジュールの遅れ",
      description:
        "関連論文の収集のタスクが遅れています。スケジュールを再調整することをお勧めします。",
      primaryAction: {
        label: "再調整する",
        onClick: () => console.log("スケジュール再調整"),
      },
      secondaryAction: {
        label: "後で",
        onClick: () => console.log("後で対応"),
      },
    },
    {
      id: "2",
      type: "improvement",
      title: "効率化の提案",
      description:
        "論文の要約と分析を並行して進めることで、作業時間を短縮できる可能性があります。",
      primaryAction: {
        label: "詳細を見る",
        onClick: () => console.log("詳細を表示"),
      },
    },
    {
      id: "3",
      type: "info",
      title: "新しい関連論文",
      description:
        "あなたの研究テーマに関連する新しい論文が3件公開されました。",
      primaryAction: {
        label: "論文を確認",
        onClick: () => console.log("論文を確認"),
      },
    },
  ]);

  const toggleTaskCompletion = (milestoneId: string, taskId: string) => {
    setProjectData((prev) => ({
      ...prev,
      milestones: prev.milestones.map((milestone) => {
        if (milestone.id === milestoneId) {
          const updatedTasks = milestone.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          );
          const completedTasks = updatedTasks.filter(
            (task) => task.completed
          ).length;
          const progress = Math.round(
            (completedTasks / updatedTasks.length) * 100
          );
          return {
            ...milestone,
            tasks: updatedTasks,
            progress,
          };
        }
        return milestone;
      }),
    }));
  };

  const getSuggestionStyles = (type: Suggestion["type"]) => {
    switch (type) {
      case "warning":
        return {
          card: "border-yellow-200 dark:border-yellow-900 bg-yellow-50/50 dark:bg-yellow-900/20",
          icon: "text-yellow-600 dark:text-yellow-500",
          text: "text-yellow-800 dark:text-yellow-500",
          description: "text-yellow-800 dark:text-yellow-400",
          primaryButton:
            "border-yellow-600/20 hover:border-yellow-600/30 hover:bg-yellow-100 dark:border-yellow-400/20 dark:hover:border-yellow-400/30 dark:hover:bg-yellow-900/40",
          secondaryButton:
            "text-yellow-800 hover:text-yellow-900 hover:bg-yellow-100 dark:text-yellow-400 dark:hover:text-yellow-300 dark:hover:bg-yellow-900/40",
        };
      case "improvement":
        return {
          card: "border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-900/20",
          icon: "text-blue-600 dark:text-blue-500",
          text: "text-blue-800 dark:text-blue-500",
          description: "text-blue-800 dark:text-blue-400",
          primaryButton:
            "border-blue-600/20 hover:border-blue-600/30 hover:bg-blue-100 dark:border-blue-400/20 dark:hover:border-blue-400/30 dark:hover:bg-blue-900/40",
          secondaryButton:
            "text-blue-800 hover:text-blue-900 hover:bg-blue-100 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/40",
        };
      case "info":
        return {
          card: "border-purple-200 dark:border-purple-900 bg-purple-50/50 dark:bg-purple-900/20",
          icon: "text-purple-600 dark:text-purple-500",
          text: "text-purple-800 dark:text-purple-500",
          description: "text-purple-800 dark:text-purple-400",
          primaryButton:
            "border-purple-600/20 hover:border-purple-600/30 hover:bg-purple-100 dark:border-purple-400/20 dark:hover:border-purple-400/30 dark:hover:bg-purple-900/40",
          secondaryButton:
            "text-purple-800 hover:text-purple-900 hover:bg-purple-100 dark:text-purple-400 dark:hover:text-purple-300 dark:hover:bg-purple-900/40",
        };
    }
  };

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

  // 全体の進捗率を計算
  const calculateOverallProgress = () => {
    const totalTasks = projectData.milestones.reduce(
      (acc, milestone) => acc + milestone.tasks.length,
      0
    );
    const completedTasks = projectData.milestones.reduce(
      (acc, milestone) =>
        acc + milestone.tasks.filter((task) => task.completed).length,
      0
    );
    return Math.round((completedTasks / totalTasks) * 100);
  };

  const overallProgress = calculateOverallProgress();

  return (
    <div className="space-y-8">
      {/* AIからの提案 */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-medium">AIからの提案</h2>
        </div>
        <div className="grid gap-2">
          {suggestions.map((suggestion) => {
            const styles = getSuggestionStyles(suggestion.type);
            return (
              <Card key={suggestion.id} className={`${styles.card} p-3`}>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className={styles.icon}>
                      {getSuggestionIcon(suggestion.type)}
                    </div>
                    <div className={`text-sm font-medium ${styles.text}`}>
                      {suggestion.title}
                    </div>
                  </div>
                  <p className={`text-xs ${styles.description}`}>
                    {suggestion.description}
                  </p>
                  <div className="flex gap-2">
                    {suggestion.primaryAction && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={suggestion.primaryAction.onClick}
                        className={`h-7 text-xs ${styles.primaryButton}`}
                      >
                        {suggestion.primaryAction.label}
                      </Button>
                    )}
                    {suggestion.secondaryAction && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={suggestion.secondaryAction.onClick}
                        className={`h-7 text-xs ${styles.secondaryButton}`}
                      >
                        {suggestion.secondaryAction.label}
                      </Button>
                    )}
                  </div>
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

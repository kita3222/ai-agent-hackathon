"use client";

import { useParams } from "next/navigation";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Progress } from "@/components/ui/progress";
import { GanttChart } from "./gantt-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalendarIcon,
  CheckCircle2,
  Clock,
  ListTodo,
  Target,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const COLORS = [
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
];

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

  return (
    <div className="space-y-8">
      {/* マイルストーン進捗状況 */}
      <div className="space-y-4">
        <h4 className="flex items-center gap-2 text-lg font-semibold">
          <Clock className="h-5 w-5 text-primary" />
          マイルストーン進捗状況
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projectData.milestones.map((milestone) => (
            <Card key={milestone.id} className="h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${milestone.color}`}
                    />
                    <CardTitle className="text-base font-medium">
                      {milestone.title}
                    </CardTitle>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  {format(milestone.startDate, "MM/dd")} -{" "}
                  {format(milestone.endDate, "MM/dd")}
                </span>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>{milestone.progress}% 完了</span>
                    </div>
                  </div>
                  <Progress value={milestone.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* タスク一覧 */}
      <div className="space-y-4">
        <h4 className="flex items-center gap-2 text-lg font-semibold">
          <ListTodo className="h-5 w-5 text-primary" />
          タスク一覧
        </h4>
        <div className="grid grid-cols-1 gap-4">
          {projectData.milestones.map((milestone) => (
            <Card key={milestone.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${milestone.color}`} />
                  <CardTitle className="text-base font-medium">
                    {milestone.title}のタスク
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {milestone.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ガントチャート */}
      <div className="space-y-4">
        <h4 className="flex items-center gap-2 text-lg font-semibold">
          <Clock className="h-5 w-5 text-primary" />
          ガントチャート
        </h4>
        <Card>
          <CardContent className="p-6 overflow-x-auto">
            <GanttChart
              startDate={projectData.milestones[0].startDate}
              endDate={new Date(projectData.deadline)}
              milestones={projectData.milestones}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

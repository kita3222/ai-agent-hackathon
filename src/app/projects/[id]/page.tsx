"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addDays } from "date-fns";
import { ProjectHeader } from "@/components/project-header";
import { GanttChart } from "@/components/gantt-chart";
import { TaskUpdate } from "@/components/task-update";
import { MilestoneProgress } from "@/components/milestone-progress";

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
  tasks: Task[];
  color: string;
};

type Project = {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  milestones: Milestone[];
};

const COLORS = [
  "bg-blue-400",
  "bg-green-400",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-indigo-400",
];

export default function ProjectDetailPage() {
  const params = useParams();
  const [goal, setProject] = useState<Project | null>(null);

  useEffect(() => {
    // In a real application, you would fetch the goal details from your backend here
    // For now, we'll use mock data
    const mockProject: Project = {
      id: params.id as string,
      title: "3ヶ月で修士論文を完成させる",
      description:
        "先行研究のレビュー、データ収集、分析、執筆のスケジュールを立てて実行する",
      deadline: addDays(new Date(), 90),
      milestones: [
        {
          id: "milestone-1",
          title: "先行研究のレビュー",
          startDate: new Date(),
          endDate: addDays(new Date(), 30),
          color: COLORS[0],
          tasks: [
            {
              id: "task-1",
              title: "関連論文の収集",
              startDate: new Date(),
              endDate: addDays(new Date(), 15),
              completed: false,
            },
            {
              id: "task-2",
              title: "論文の要約と分析",
              startDate: addDays(new Date(), 16),
              endDate: addDays(new Date(), 30),
              completed: false,
            },
          ],
        },
        {
          id: "milestone-2",
          title: "データ収集と分析",
          startDate: addDays(new Date(), 31),
          endDate: addDays(new Date(), 60),
          color: COLORS[1],
          tasks: [
            {
              id: "task-3",
              title: "データ収集方法の決定",
              startDate: addDays(new Date(), 31),
              endDate: addDays(new Date(), 40),
              completed: false,
            },
            {
              id: "task-4",
              title: "データの収集と整理",
              startDate: addDays(new Date(), 41),
              endDate: addDays(new Date(), 50),
              completed: false,
            },
            {
              id: "task-5",
              title: "データの分析",
              startDate: addDays(new Date(), 51),
              endDate: addDays(new Date(), 60),
              completed: false,
            },
          ],
        },
        {
          id: "milestone-3",
          title: "論文執筆と校正",
          startDate: addDays(new Date(), 61),
          endDate: addDays(new Date(), 90),
          color: COLORS[2],
          tasks: [
            {
              id: "task-6",
              title: "論文の構成決定",
              startDate: addDays(new Date(), 61),
              endDate: addDays(new Date(), 70),
              completed: false,
            },
            {
              id: "task-7",
              title: "各セクションの執筆",
              startDate: addDays(new Date(), 71),
              endDate: addDays(new Date(), 85),
              completed: false,
            },
            {
              id: "task-8",
              title: "校正と最終確認",
              startDate: addDays(new Date(), 86),
              endDate: addDays(new Date(), 90),
              completed: false,
            },
          ],
        },
      ],
    };

    setProject(mockProject);
  }, [params.id]);

  const toggleTaskCompletion = (taskId: string) => {
    if (!goal) return;

    setProject({
      ...goal,
      milestones: goal.milestones.map((milestone) => ({
        ...milestone,
        tasks: milestone.tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        ),
      })),
    });
  };

  const calculateProgress = (tasks: Task[]) => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    return (completedTasks / totalTasks) * 100;
  };

  const calculateOverallProgress = (milestones: Milestone[]) => {
    const totalTasks = milestones.reduce(
      (sum, milestone) => sum + milestone.tasks.length,
      0
    );
    const completedTasks = milestones.reduce(
      (sum, milestone) =>
        sum + milestone.tasks.filter((task) => task.completed).length,
      0
    );
    return (completedTasks / totalTasks) * 100;
  };

  if (!goal) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <ProjectHeader
        title={goal.title}
        description={goal.description}
        deadline={goal.deadline}
        progress={calculateOverallProgress(goal.milestones)}
      />
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>マイルストーン進捗状況</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {goal.milestones.map((milestone) => (
              <MilestoneProgress
                key={milestone.id}
                title={milestone.title}
                startDate={milestone.startDate}
                endDate={milestone.endDate}
                progress={calculateProgress(milestone.tasks)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>ガントチャート</CardTitle>
        </CardHeader>
        <CardContent>
          <GanttChart
            milestones={goal.milestones}
            startDate={new Date()}
            endDate={goal.deadline}
          />
        </CardContent>
      </Card>
      {goal.milestones.map((milestone) => (
        <Card key={milestone.id} className="mb-6">
          <CardHeader>
            <CardTitle>{milestone.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {milestone.tasks.map((task) => (
                <TaskUpdate
                  key={task.id}
                  task={task}
                  onToggleTask={toggleTaskCompletion}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

"use client";

import { useState, useEffect, useMemo } from "react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addDays, format, parseISO, startOfDay, endOfDay, add } from "date-fns";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ja } from "date-fns/locale/ja";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import {
  GanttChart,
  type Task,
  type Milestone,
  COLORS,
} from "@/components/gantt-chart";

type ScheduleSuggestionsProps = {
  goal: string;
  deadline: string;
  tasks: string[];
};

function TimelineNode({
  milestone,
  isFirst,
  isLast,
  onDateChange,
}: {
  milestone: Milestone;
  isFirst: boolean;
  isLast: boolean;
  onDateChange: (
    taskIndex: number | null,
    isStart: boolean,
    date: Date
  ) => void;
}) {
  // マイルストーンの日付を計算
  const milestoneStartDate = milestone.tasks.reduce(
    (earliest, task) => (task.startDate < earliest ? task.startDate : earliest),
    milestone.tasks[0].startDate
  );
  const milestoneEndDate = milestone.tasks.reduce(
    (latest, task) => (task.endDate > latest ? task.endDate : latest),
    milestone.tasks[0].endDate
  );

  return (
    <div className="relative flex items-center space-x-4">
      <div className="flex flex-col items-center relative">
        {!isFirst && (
          <div className="absolute w-0.5 bg-gray-200 h-[4rem] -top-[4rem] left-1/2 -translate-x-1/2" />
        )}
        <div
          className={`w-4 h-4 ${milestone.color} rounded-full flex items-center justify-center ring-4 ring-${milestone.color}/20 relative z-10`}
        >
          <div className="w-2 h-2rounded-full" />
        </div>
        {!isLast && (
          <div className="absolute w-0.5 bg-gray-200 h-[4rem] top-4 left-1/2 -translate-x-1/2" />
        )}
      </div>
      <div className="flex-1">
        <div className="rounded-xl border shadow-sm p-4 hover:shadow-md transition-shadow relative">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 gap-2">
              <h3 className="text-lg font-semibold">{milestone.title}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{format(milestoneStartDate, "MM/dd")}</span>
                <span>-</span>
                <span>{format(milestoneEndDate, "MM/dd")}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {milestone.tasks.map((task, taskIndex) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center space-x-3 px-2">
                  <div className={`w-2 h-2 rounded-full ${milestone.color}`} />
                  <span className="text-sm">{task.title}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="date"
                    value={format(task.startDate, "yyyy-MM-dd")}
                    onChange={(e) => {
                      const date = parseISO(e.target.value);
                      onDateChange(taskIndex, true, date);
                    }}
                    className="w-36"
                  />
                  <span>-</span>
                  <Input
                    type="date"
                    value={format(task.endDate, "yyyy-MM-dd")}
                    onChange={(e) => {
                      const date = parseISO(e.target.value);
                      onDateChange(taskIndex, false, date);
                    }}
                    className="w-36"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ScheduleSuggestions({
  goal,
  deadline,
  tasks,
}: ScheduleSuggestionsProps) {
  const router = useRouter();
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(parseISO(deadline));

  useEffect(() => {
    const generateMilestones = (tasks: string[], deadline: string) => {
      const endDate = parseISO(deadline);
      const startDate = new Date();
      const totalDays = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      const milestoneCount = Math.min(Math.ceil(tasks.length / 2), 3); // Create up to 3 milestones

      return Array.from({ length: milestoneCount }, (_, index) => {
        const milestoneStartDate = addDays(
          startDate,
          Math.floor((totalDays / milestoneCount) * index)
        );
        const milestoneEndDate =
          index === milestoneCount - 1
            ? endDate
            : addDays(
                startDate,
                Math.floor((totalDays / milestoneCount) * (index + 1)) - 1
              );

        const milestoneTasks = tasks
          .slice(index * 2, (index + 1) * 2)
          .map((task, taskIndex) => ({
            id: `task-${index}-${taskIndex}`,
            title: task,
            startDate: addDays(
              milestoneStartDate,
              taskIndex * Math.floor(totalDays / (milestoneCount * 2))
            ),
            endDate: addDays(
              milestoneStartDate,
              (taskIndex + 1) * Math.floor(totalDays / (milestoneCount * 2)) - 1
            ),
            completed: false,
          }));

        return {
          id: `milestone-${index + 1}`,
          title: `中間目標 ${index + 1}`,
          startDate: milestoneStartDate,
          endDate: milestoneEndDate,
          tasks: milestoneTasks,
          color: COLORS[index % COLORS.length],
        };
      });
    };

    setMilestones(generateMilestones(tasks, deadline));
  }, [tasks, deadline]);

  const handleDateChange = (
    milestoneIndex: number,
    taskIndex: number | null,
    isStart: boolean,
    newDate: Date
  ) => {
    setMilestones((prevMilestones) => {
      const updatedMilestones = [...prevMilestones];
      const milestone = { ...updatedMilestones[milestoneIndex] };

      if (taskIndex !== null) {
        // Update task date
        const task = { ...milestone.tasks[taskIndex] };
        if (isStart) {
          task.startDate = newDate;
        } else {
          task.endDate = newDate;
        }
        milestone.tasks[taskIndex] = task;

        // Update milestone dates based on tasks
        milestone.startDate = milestone.tasks.reduce(
          (earliest, t) => (t.startDate < earliest ? t.startDate : earliest),
          task.startDate
        );
        milestone.endDate = milestone.tasks.reduce(
          (latest, t) => (t.endDate > latest ? t.endDate : latest),
          task.endDate
        );
      }

      updatedMilestones[milestoneIndex] = milestone;
      return updatedMilestones;
    });
  };

  const handleSaveSchedule = () => {
    // In a real application, you would save the schedule to your backend here
    // For now, we'll just navigate to the goal detail page with a mock ID
    const goalId = "goal-" + Date.now(); // This is a temporary way to generate an ID
    router.push(`/projects/${goalId}`);
  };

  const handleApplyToCalendar = () => {
    // Here you would typically update your backend with the new milestone and task dates
    // For this example, we'll just update the local state
    setStartDate(milestones[0].startDate);
    setEndDate(milestones[milestones.length - 1].endDate);
    // You might want to show a success message here
    alert("カレンダーに反映されました");
  };

  return (
    <Card>
      <CardContent className="p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">{goal}</h2>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>
                目標期限: {format(parseISO(deadline), "yyyy年MM月dd日")}
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleApplyToCalendar}>
              カレンダーに反映
            </Button>
            <Button onClick={handleSaveSchedule}>スケジュールを保存</Button>
          </div>
        </div>

        <GanttChart
          startDate={startDate}
          endDate={endDate}
          milestones={milestones}
          className="overflow-hidden"
        />

        <div className="relative">
          <div className="absolute inset-y-0 left-[1.55rem] w-0.5 bg-gray-100 -z-10" />
          <div className="space-y-[4rem]">
            {milestones.map((milestone, index) => (
              <TimelineNode
                key={milestone.id}
                milestone={milestone}
                isFirst={index === 0}
                isLast={index === milestones.length - 1}
                onDateChange={(taskIndex, isStart, date) =>
                  handleDateChange(index, taskIndex, isStart, date)
                }
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

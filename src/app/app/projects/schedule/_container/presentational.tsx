"use client";

import React from "react";
import { format, parseISO } from "date-fns";
import { FlagIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GanttChart, type Milestone } from "@/components/gantt-chart";

type Task = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  completed: boolean;
};

type PresentationalProps = {
  goal: string;
  deadline: string;
  milestones: Milestone[];
  startDate: Date;
  endDate: Date;
  onDateChange: (
    milestoneIndex: number,
    taskIndex: number | null,
    isStart: boolean,
    newDate: Date
  ) => void;
  onBack: () => void;
  onSave: () => void;
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

export default function Presentational({
  goal,
  deadline,
  milestones,
  startDate,
  endDate,
  onDateChange,
  onBack,
  onSave,
}: PresentationalProps) {
  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="w-full bg-gray-50 dark:bg-gray-900 lg:col-span-3">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FlagIcon className="h-5 w-5 text-primary" />
              <CardTitle className="text-md">設定した目標</CardTitle>
            </div>
            <div className="space-y-1.5 mt-2">
              <h3 className="text-md font-semibold">{goal}</h3>
              <CardDescription>
                期限: {format(parseISO(deadline), "yyyy年MM月dd日")}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>

        <Card className="w-full lg:col-span-3">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">ガントチャート</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <GanttChart
              startDate={startDate}
              endDate={endDate}
              milestones={milestones}
              className="overflow-hidden"
            />
          </CardContent>
        </Card>

        <div className="space-y-6 lg:col-span-3">
          {milestones.map((milestone, index) => (
            <TimelineNode
              key={milestone.id}
              milestone={milestone}
              isFirst={index === 0}
              isLast={index === milestones.length - 1}
              onDateChange={(taskIndex, isStart, date) =>
                onDateChange(index, taskIndex, isStart, date)
              }
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4 justify-end">
        <Button onClick={onBack} variant="outline" className="max-w-xs">
          戻る
        </Button>
        <Button onClick={onSave} className="max-w-xs">
          スケジュールを保存
        </Button>
      </div>
    </div>
  );
}

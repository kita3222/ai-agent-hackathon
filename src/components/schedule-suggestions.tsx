"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addDays, format, parseISO } from "date-fns";
import { useRouter } from "next/navigation";
import { GanttChart } from "@/components/gantt-chart";

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

type ScheduleSuggestionsProps = {
  goal: string;
  deadline: string;
  tasks: string[];
};

const COLORS = [
  "bg-blue-400",
  "bg-green-400",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-indigo-400",
];

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
          title: `マイルストーン ${index + 1}`,
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
    newDate: string
  ) => {
    setMilestones((prevMilestones) => {
      const updatedMilestones = [...prevMilestones];
      const milestone = { ...updatedMilestones[milestoneIndex] };

      if (taskIndex === null) {
        // Update milestone date
        if (isStart) {
          milestone.startDate = parseISO(newDate);
        } else {
          milestone.endDate = parseISO(newDate);
        }
      } else {
        // Update task date
        const task = { ...milestone.tasks[taskIndex] };
        if (isStart) {
          task.startDate = parseISO(newDate);
        } else {
          task.endDate = parseISO(newDate);
        }
        milestone.tasks[taskIndex] = task;
      }

      updatedMilestones[milestoneIndex] = milestone;
      return updatedMilestones;
    });
  };

  const handleSaveSchedule = () => {
    // In a real application, you would save the schedule to your backend here
    // For now, we'll just navigate to the goal detail page with a mock ID
    const goalId = "goal-" + Date.now(); // This is a temporary way to generate an ID
    router.push(`/goals/${goalId}`);
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
      <CardHeader>
        <CardTitle>スケジュール提案: {goal}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          目標期限: {format(parseISO(deadline), "yyyy年MM月dd日")}
        </p>
        <div className="space-y-8">
          <GanttChart
            milestones={milestones}
            startDate={startDate}
            endDate={endDate}
          />

          <Card>
            <CardHeader>
              <CardTitle>マイルストーンとタスク詳細</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {milestones.map((milestone, milestoneIndex) => (
                  <div key={milestone.id} className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-4 h-4 rounded-full ${milestone.color}`}
                      ></div>
                      <h3 className="text-lg font-semibold">
                        {milestone.title}
                      </h3>
                    </div>
                    <div className="pl-6 space-y-4">
                      <div className="flex space-x-4">
                        <div>
                          <Label htmlFor={`milestone-start-${milestoneIndex}`}>
                            開始日
                          </Label>
                          <Input
                            id={`milestone-start-${milestoneIndex}`}
                            type="date"
                            value={format(milestone.startDate, "yyyy-MM-dd")}
                            onChange={(e) =>
                              handleDateChange(
                                milestoneIndex,
                                null,
                                true,
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor={`milestone-end-${milestoneIndex}`}>
                            終了日
                          </Label>
                          <Input
                            id={`milestone-end-${milestoneIndex}`}
                            type="date"
                            value={format(milestone.endDate, "yyyy-MM-dd")}
                            onChange={(e) =>
                              handleDateChange(
                                milestoneIndex,
                                null,
                                false,
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        {milestone.tasks.map((task, taskIndex) => (
                          <div
                            key={task.id}
                            className="flex items-center space-x-2"
                          >
                            <Label
                              htmlFor={`task-${milestoneIndex}-${taskIndex}`}
                              className={`flex-grow ${
                                task.completed
                                  ? "line-through text-gray-500"
                                  : ""
                              }`}
                            >
                              {task.title}
                            </Label>
                            <div className="flex space-x-2">
                              <Input
                                type="date"
                                value={format(task.startDate, "yyyy-MM-dd")}
                                onChange={(e) =>
                                  handleDateChange(
                                    milestoneIndex,
                                    taskIndex,
                                    true,
                                    e.target.value
                                  )
                                }
                                className="w-auto"
                              />
                              <Input
                                type="date"
                                value={format(task.endDate, "yyyy-MM-dd")}
                                onChange={(e) =>
                                  handleDateChange(
                                    milestoneIndex,
                                    taskIndex,
                                    false,
                                    e.target.value
                                  )
                                }
                                className="w-auto"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex space-x-4 mt-6">
          <Button className="flex-1" onClick={handleApplyToCalendar}>
            カレンダーに反映
          </Button>
          <Button className="flex-1" onClick={handleSaveSchedule}>
            スケジュールを保存
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

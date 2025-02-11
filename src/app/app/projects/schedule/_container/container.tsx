import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addDays, parseISO } from "date-fns";
import Presentational from "./presentational";
import { COLORS } from "@/app/_components/gantt-chart";

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

type Props = {
  goal: string;
  deadline: string;
  tasks: string[];
};

export default function ScheduleContainer({ goal, deadline, tasks }: Props) {
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
      const milestoneCount = Math.min(Math.ceil(tasks.length / 2), 3);

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
        const task = { ...milestone.tasks[taskIndex] };
        if (isStart) {
          task.startDate = newDate;
        } else {
          task.endDate = newDate;
        }
        milestone.tasks[taskIndex] = task;
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
    const goalId = "goal-" + Date.now();
    router.push(`/app/projects/${goalId}`);
  };

  const handleBack = () => {
    router.push("/app/projects/suggest");
  };

  return (
    <Presentational
      goal={goal}
      deadline={deadline}
      milestones={milestones}
      startDate={startDate}
      endDate={endDate}
      onDateChange={handleDateChange}
      onBack={handleBack}
      onSave={handleSaveSchedule}
    />
  );
}

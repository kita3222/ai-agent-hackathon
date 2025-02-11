import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { format } from "date-fns";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type MilestoneCardProps = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  tasks: Task[];
  onToggleTask: (milestoneId: string, taskId: string) => void;
};

export function MilestoneCard({
  id,
  title,
  startDate,
  endDate,
  tasks,
  onToggleTask,
}: MilestoneCardProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {format(startDate, "yyyy年MM月dd日")} -{" "}
          {format(endDate, "yyyy年MM月dd日")}
        </p>
        <div className="space-y-2">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center space-x-2">
              <Checkbox
                id={task.id}
                checked={task.completed}
                onCheckedChange={() => onToggleTask(id, task.id)}
              />
              <label
                htmlFor={task.id}
                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                  task.completed ? "line-through text-muted-foreground" : ""
                }`}
              >
                {task.title}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

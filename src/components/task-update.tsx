import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

type Task = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  completed: boolean;
};

type TaskUpdateProps = {
  task: Task;
  onToggleTask: (taskId: string) => void;
};

export function TaskUpdate({ task, onToggleTask }: TaskUpdateProps) {
  return (
    <div className="flex items-center justify-between space-x-2 py-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={task.id}
          checked={task.completed}
          onCheckedChange={() => onToggleTask(task.id)}
        />
        <Label
          htmlFor={task.id}
          className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
            task.completed ? "line-through text-muted-foreground" : ""
          }`}
        >
          {task.title}
        </Label>
      </div>

      <div className="text-xs text-muted-foreground">
        {format(task.startDate, "MM/dd")} - {format(task.endDate, "MM/dd")}
      </div>
    </div>
  );
}

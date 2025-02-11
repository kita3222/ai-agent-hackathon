"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CheckIcon, FlagIcon } from "lucide-react";
import { format, parseISO } from "date-fns";

type Task = {
  id: string;
  title: string;
  selected: boolean;
};

interface PresentationalProps {
  goal: string;
  deadline: string;
  description: string;
  type: string;
  tasks: Task[];
  newTask: string;
  setNewTask: (value: string) => void;
  onToggleTask: (id: string) => void;
  onUpdateTaskTitle: (id: string, title: string) => void;
  onAddTask: (taskTitle: string) => void;
  onDragEnd: (oldIndex: number, newIndex: number) => void;
}

function SortableTask({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

function TimelineMarker({ isLast }: { isLast: boolean }) {
  return (
    <div className="flex items-center justify-center h-8 relative">
      {!isLast && (
        <>
          <div className="absolute left-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 to-blue-200 -translate-x-1/2" />
          <div className="relative w-2 h-2 bg-blue-500 rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </>
      )}
    </div>
  );
}

export default function Presentational({
  goal,
  deadline,
  description,
  type,
  tasks,
  newTask,
  setNewTask,
  onToggleTask,
  onUpdateTaskTitle,
  onAddTask,
  onDragEnd,
}: PresentationalProps) {
  const router = useRouter();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over?.id);
      onDragEnd(oldIndex, newIndex);
    }
  };

  const handleSubmit = () => {
    const selectedTasks = tasks
      .filter((task) => task.selected)
      .map((task) => task.title);
    const queryParams = new URLSearchParams({
      goal: goal,
      deadline: deadline,
      tasks: JSON.stringify(selectedTasks),
    }).toString();
    router.push(`/app/projects/schedule?${queryParams}`);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-50 dark:bg-gray-900">
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

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckIcon className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">タスクの設定</CardTitle>
          </div>
          <CardDescription>
            目標を達成するために必要なタスクを選択・編集してください。
            タスクは自由に追加することもできます。
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={tasks.map((task) => task.id)}
                strategy={verticalListSortingStrategy}
              >
                {tasks.map((task, index) => {
                  const isLast = index === tasks.length - 1;
                  return (
                    <SortableTask key={task.id} id={task.id}>
                      <div className="space-y-1">
                        <div className="rounded-lg border bg-card shadow-sm p-3 hover:shadow-md transition-shadow">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                              <span className="font-medium">
                                Step {index + 1}
                              </span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Checkbox
                                id={task.id}
                                checked={task.selected}
                                onCheckedChange={() => onToggleTask(task.id)}
                                className="h-4 w-4"
                              />
                              <Input
                                id={`task-title-${task.id}`}
                                type="text"
                                value={task.title}
                                onChange={(e) =>
                                  onUpdateTaskTitle(task.id, e.target.value)
                                }
                                className="text-sm font-medium leading-none w-full shadow-none focus-visible:ring-0 px-2 py-1.5 bg-transparent"
                              />
                            </div>
                          </div>
                        </div>
                        <TimelineMarker isLast={isLast} />
                      </div>
                    </SortableTask>
                  );
                })}
              </SortableContext>
            </DndContext>

            <div className="flex space-x-2 items-center">
              <Input
                placeholder="新しいタスクを追加"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="bg-white shadow-sm"
              />
              <Button
                onClick={() => onAddTask(newTask)}
                size="sm"
                className="shrink-0 px-4"
              >
                追加
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3 justify-end">
        <Button
          onClick={() => router.push("/app/projects/new")}
          variant="outline"
        >
          戻る
        </Button>
        <Button type="submit" onClick={handleSubmit}>
          スケジュール設定
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { Label } from "@/components/ui/label";

import {
  DndContext,
  closestCenter,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
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

type TaskSuggestionsProps = {
  goal: string;
  deadline: string;
  description: string;
  type: string;
};

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

export function TaskSuggestions({
  goal,
  deadline,
  description,
  type,
}: TaskSuggestionsProps) {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over?.id);
      setTasks(arrayMove(tasks, oldIndex, newIndex));
    }
  };

  useEffect(() => {
    const generateTasks = (goal: string, type: string) => {
      const baseTasks = [
        "目標を小さなステップに分解する",
        "各ステップの締め切りを設定する",
        "進捗を定期的に確認する",
        "困難に直面したら助けを求める",
        "成功を祝う時間を設ける",
      ];

      const typeTasks = {
        personal: ["個人の優先順位を明確にする", "日々の習慣を形成する"],
        work: ["チームと目標を共有する", "定期的な進捗報告会を設定する"],
        learning: ["学習リソースを収集する", "定期的に学んだことを復習する"],
        health: ["運動計画を立てる", "食事の記録をつける"],
      };

      const combinedTasks = [
        ...baseTasks,
        ...(typeTasks[type as keyof typeof typeTasks] || []),
      ];

      return combinedTasks.map((task, index) => ({
        id: `task-${index + 1}`,
        title: task,
        selected: false,
      }));
    };

    setTasks(generateTasks(goal, type));
  }, [goal, type]);

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, selected: !task.selected } : task
      )
    );
  };

  const updateTaskTitle = (id: string, newTitle: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: `task-${tasks.length + 1}`,
          title: newTask.trim(),
          selected: true,
        },
      ]);
      setNewTask("");
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
    <div className="w-full space-y-6">
      <div className="flex flex-col items-center text-center">
        <CheckIcon className="h-10 w-10 text-primary mb-4" />
        <h2 className="text-3xl font-bold tracking-tight">タスクの設定</h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
          目標を達成するために必要なタスクを選択・編集してください。
          タスクは自由に追加することもできます。
        </p>
      </div>

      <Card className="w-full bg-gray-50 dark:bg-gray-900">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FlagIcon className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">設定した目標</CardTitle>
          </div>
          <div className="space-y-1.5 mt-2">
            <h3 className="text-lg font-semibold">{goal}</h3>
            <CardDescription>
              期限: {format(parseISO(deadline), "yyyy年MM月dd日")}
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

      <div className="space-y-4 rounded-lg　shadow-sm">
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
                          <span className="font-medium">Step {index + 1}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id={task.id}
                            checked={task.selected}
                            onCheckedChange={() => toggleTask(task.id)}
                            className="h-4 w-4"
                          />
                          <Input
                            id={`task-title-${task.id}`}
                            type="text"
                            value={task.title}
                            onChange={(e) =>
                              updateTaskTitle(task.id, e.target.value)
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

        <div className="flex space-x-2 items-center mt-4">
          <Input
            placeholder="新しいタスクを追加"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="bg-white shadow-sm"
          />
          <Button onClick={addTask} size="sm" className="shrink-0 px-4">
            追加
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4 justify-end">
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

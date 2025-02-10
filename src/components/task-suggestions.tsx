"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
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
import { PlusIcon } from "lucide-react";

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
    <div className="flex items-center justify-center h-12 relative">
      {!isLast && (
        <>
          <div className="absolute left-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 to-blue-200 -translate-x-1/2" />
          <div className="relative w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
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
    router.push(`/projects/schedule?${queryParams}`);
  };

  return (
    <Card>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">タスク一覧</h3>
            <p className="text-sm text-muted-foreground mb-4">
              期限: {new Date(deadline).toLocaleDateString("ja-JP")} | 説明:{" "}
              {description}
            </p>
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
                      <div className="space-y-2">
                        <div className="rounded-lg border shadow-sm p-3 hover:shadow-md transition-shadow">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <span className="font-medium">
                                Step {index + 1}
                              </span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Checkbox
                                id={task.id}
                                checked={task.selected}
                                onCheckedChange={() => toggleTask(task.id)}
                                className="h-5 w-5"
                              />
                              <Input
                                id={`task-title-${task.id}`}
                                type="text"
                                value={task.title}
                                onChange={(e) =>
                                  updateTaskTitle(task.id, e.target.value)
                                }
                                className="text-sm font-medium leading-none w-full shadow-none focus-visible:ring-0 px-3 py-0.5"
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
            <div className="flex space-x-2 mt-4 items-center">
              <Input
                placeholder="新しいタスクを追加"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="bg-white shadow-sm"
              />
              <Button
                onClick={addTask}
                size="sm"
                startIcon={<PlusIcon className="w-4 h-4" />}
              >
                追加
              </Button>
            </div>
          </div>
        </div>
        <Button className="w-full mt-6" onClick={handleSubmit}>
          スケジュールの設定へ
        </Button>
      </CardContent>
    </Card>
  );
}

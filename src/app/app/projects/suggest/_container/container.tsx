"use client";

import { useState, useEffect } from "react";
import Presentational from "./presentational";

type Task = {
  id: string;
  title: string;
  selected: boolean;
};

interface TaskSuggestionsContainerProps {
  goal: string;
  deadline: string;
  description: string;
  type: string;
}

export default function TaskSuggestionsContainer({
  goal,
  deadline,
  description,
  type,
}: TaskSuggestionsContainerProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

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

  const addTask = (taskTitle: string) => {
    if (taskTitle.trim()) {
      setTasks([
        ...tasks,
        {
          id: `task-${tasks.length + 1}`,
          title: taskTitle.trim(),
          selected: true,
        },
      ]);
    }
  };

  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    const newTasks = [...tasks];
    const [removed] = newTasks.splice(oldIndex, 1);
    newTasks.splice(newIndex, 0, removed);
    setTasks(newTasks);
  };

  return (
    <Presentational
      goal={goal}
      deadline={deadline}
      description={description}
      type={type}
      tasks={tasks}
      newTask={newTask}
      setNewTask={setNewTask}
      onToggleTask={toggleTask}
      onUpdateTaskTitle={updateTaskTitle}
      onAddTask={addTask}
      onDragEnd={handleDragEnd}
    />
  );
}

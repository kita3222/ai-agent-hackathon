import { TaskSuggestions } from "@/components/task-suggestions";
import { format, parseISO } from "date-fns";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FlagIcon } from "lucide-react";
import SectionHeader from "@/components/layouts/section-header";
import TaskSuggestionsContainer from "./_container/container";

export default function SuggestTasksPage({
  searchParams,
}: {
  searchParams: {
    goal: string;
    deadline: string;
    description: string;
    type: string;
  };
}) {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-4">
      <SectionHeader
        title="タスクの設定"
        subtitle="目標を達成するために必要なタスクを選択・編集してください。"
      />
      <TaskSuggestionsContainer
        goal={searchParams.goal}
        deadline={searchParams.deadline}
        description={searchParams.description}
        type={searchParams.type}
      />
    </div>
  );
}

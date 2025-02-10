import SectionHeader from "@/components/layouts/section-header";
import { TaskSuggestions } from "@/components/task-suggestions";

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
        title="タスク提案"
        subtitle="設定された目標に応じたタスクを提案します。"
      />
      <TaskSuggestions
        goal={searchParams.goal}
        deadline={searchParams.deadline}
        description={searchParams.description}
        type={searchParams.type}
      />
    </div>
  );
}

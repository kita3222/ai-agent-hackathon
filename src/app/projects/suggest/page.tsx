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
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-2">タスク提案</h1>
      <p className="text-md mb-6 text-gray-500">
        目標達成のために以下のタスクを提案します。適切だと思うタスクを選択し、必要に応じて編集や追加を行ってください。
      </p>
      <TaskSuggestions
        goal={searchParams.goal}
        deadline={searchParams.deadline}
        description={searchParams.description}
        type={searchParams.type}
      />
    </div>
  );
}

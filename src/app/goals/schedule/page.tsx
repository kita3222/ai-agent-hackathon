import { ScheduleSuggestions } from "@/components/schedule-suggestions";

export default function SchedulePage({
  searchParams,
}: {
  searchParams: { goal: string; deadline: string; tasks: string };
}) {
  const tasks = JSON.parse(searchParams.tasks);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">スケジュール提案</h1>
      <p className="text-lg mb-6">
        目標達成に向けた具体的なスケジュールを提案します。
        マイルストーンとタスクの予定日を確認し、必要に応じて調整してください。
      </p>
      <ScheduleSuggestions
        goal={searchParams.goal}
        deadline={searchParams.deadline}
        tasks={tasks}
      />
    </div>
  );
}

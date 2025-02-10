import SectionHeader from "@/components/layouts/section-header";
import { ScheduleSuggestions } from "@/components/schedule-suggestions";

export default function SchedulePage({
  searchParams,
}: {
  searchParams: { goal: string; deadline: string; tasks: string };
}) {
  const tasks = JSON.parse(searchParams.tasks);

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-4">
      <SectionHeader
        title="スケジュールの設定"
        subtitle="目標達成に向けた具体的なスケジュールを提案します。
          マイルストーンとタスクの予定日を確認し、必要に応じて調整してください。"
      />
      <ScheduleSuggestions
        goal={searchParams.goal}
        deadline={searchParams.deadline}
        tasks={tasks}
      />
    </div>
  );
}

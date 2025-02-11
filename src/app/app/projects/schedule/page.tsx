import SectionHeader from "@/components/layouts/section-header";
import ScheduleContainer from "./_container/container";

type Props = {
  searchParams: {
    goal: string;
    deadline: string;
    tasks: string;
  };
};

export default function SchedulePage({ searchParams }: Props) {
  const tasks = JSON.parse(searchParams.tasks);

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-4">
      <SectionHeader
        title="スケジュールの設定"
        subtitle="目標達成に向けた具体的なスケジュールを提案します。
          マイルストーンとタスクの予定日を確認し、必要に応じて調整してください。"
      />
      <ScheduleContainer
        goal={searchParams.goal}
        deadline={searchParams.deadline}
        tasks={tasks}
      />
    </div>
  );
}

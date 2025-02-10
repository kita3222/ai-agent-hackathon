import { ScheduleSuggestions } from "@/components/schedule-suggestions";

export default function SchedulePage({
  searchParams,
}: {
  searchParams: { goal: string; deadline: string; tasks: string };
}) {
  const tasks = JSON.parse(searchParams.tasks);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center w-full py-8">
      <div className="w-full max-w-5xl mx-auto px-4">
        <ScheduleSuggestions
          goal={searchParams.goal}
          deadline={searchParams.deadline}
          tasks={tasks}
        />
      </div>
    </div>
  );
}

import { TaskSuggestions } from "@/components/task-suggestions";
import { format, parseISO } from "date-fns";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FlagIcon } from "lucide-react";

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
    <div className="flex min-h-[80vh] flex-col items-center justify-center w-full py-8">
      <div className="w-full max-w-2xl mx-auto px-4">
        <TaskSuggestions
          goal={searchParams.goal}
          deadline={searchParams.deadline}
          description={searchParams.description}
          type={searchParams.type}
        />
      </div>
    </div>
  );
}

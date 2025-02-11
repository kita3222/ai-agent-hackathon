import Presentational from "./presentational";

interface ScheduleSuggestionsContainerProps {
  goal: string;
  deadline: string;
  tasks: string[];
}

export default function ScheduleSuggestionsContainer({
  goal,
  deadline,
  tasks,
}: ScheduleSuggestionsContainerProps) {
  // Server-side logic: data fetching or processing can be added here
  return <Presentational goal={goal} deadline={deadline} tasks={tasks} />;
}

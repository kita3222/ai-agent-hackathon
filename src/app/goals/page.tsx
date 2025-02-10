import { GoalList } from "@/components/goal-list";

export default function GoalsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">あなたのゴール</h1>
      <GoalList />
    </div>
  );
}

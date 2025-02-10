import { GoalCreationForm } from "@/components/goal-creation-form";

export default function NewGoalPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">新しいゴールを設定</h1>
      <GoalCreationForm />
    </div>
  );
}

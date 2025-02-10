import { GoalList } from "@/components/goal-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ダッシュボード - TaskMaster",
  description: "目標の進捗状況を管理・追跡",
};

export default function Home() {
  return (
    <div className="space-y-6">
      <GoalList />
    </div>
  );
}

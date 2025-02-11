import SectionHeader from "@/app/_components/layouts/section-header";
import ProjectCreationContainer from "./_container/container";

export default function NewProjectPage() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-4">
      <SectionHeader
        title="新しい目標を設定"
        subtitle="目標の詳細を入力して、達成までの計画を立てましょう"
      />
      <ProjectCreationContainer />
    </div>
  );
}

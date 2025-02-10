import SectionHeader from "@/components/layouts/section-header";
import { ProjectCreationForm } from "@/components/project-creation-form";

export default function NewProjectPage() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-4">
      <SectionHeader
        title="新しい目標を設定"
        subtitle="目標の詳細を入力して、達成までの計画を立てましょう"
      />
      <ProjectCreationForm />
    </div>
  );
}

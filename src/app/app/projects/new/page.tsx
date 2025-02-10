import SectionHeader from "@/components/layouts/section-header";
import { ProjectCreationForm } from "@/components/project-creation-form";

export default function NewProjectPage() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-4">
      <SectionHeader
        title="プロジェクトの新規作成"
        subtitle="このプロジェクトの目標を設定してください。"
      />
      <ProjectCreationForm />
    </div>
  );
}

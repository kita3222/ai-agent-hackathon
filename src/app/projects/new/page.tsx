import { ProjectCreationForm } from "@/components/project-creation-form";

export default function NewProjectPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">新しいプロジェクトを設定</h1>
      <ProjectCreationForm />
    </div>
  );
}

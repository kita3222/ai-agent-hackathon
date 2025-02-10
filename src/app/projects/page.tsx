import { ProjectList } from "@/components/project-list";

export default function ProjectPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">プロジェクト一覧</h1>
      <ProjectList />
    </div>
  );
}

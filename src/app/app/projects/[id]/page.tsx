import ProjectDetail from "@/components/project-detail";
import SectionHeader from "@/components/layouts/section-header";

export default function ProjectDetailPage() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-4">
      <SectionHeader title="プロジェクトの詳細" />
      <ProjectDetail />
    </div>
  );
}

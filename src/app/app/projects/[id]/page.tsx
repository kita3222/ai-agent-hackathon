import ProjectDetailContainer from "./_container/container";
import SectionHeader from "@/components/layouts/section-header";
type Props = {
  params: {
    id: string;
  };
};

export default function ProjectDetailPage({ params }: Props) {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-4">
      <SectionHeader title="プロジェクト詳細" />
      <ProjectDetailContainer params={params} />
    </div>
  );
}

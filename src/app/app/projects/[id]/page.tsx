import ProjectDetailContainer from "./_container/container";

type Props = {
  params: {
    id: string;
  };
};

export default function ProjectDetailPage({ params }: Props) {
  return (
    <div className="container mx-auto py-8">
      <ProjectDetailContainer params={params} />
    </div>
  );
}

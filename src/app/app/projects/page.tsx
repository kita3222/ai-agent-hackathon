import SectionHeader from "@/components/layouts/section-header";
import { ProjectList } from "@/components/project-list";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function ProjectPage() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-4">
      <SectionHeader
        title="プロジェクト一覧"
        button={
          <Button size="sm" startIcon={<PlusIcon />} asChild>
            <Link href="/app/projects/new">新規作成</Link>
          </Button>
        }
      />
      <ProjectList />
    </div>
  );
}

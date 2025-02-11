"use client";

import React from "react";
import { notFound } from "next/navigation";
import Presentational from "./presentational";

const COLORS = [
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
];

type Task = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  completed: boolean;
};

type Milestone = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  color: string;
  tasks: Task[];
};

type ProjectData = {
  title: string;
  description: string;
  deadline: string;
  milestones: Milestone[];
};

export type Suggestion = {
  id: string;
  type: "warning" | "info" | "improvement";
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
};

async function getProjectData(id: string): Promise<ProjectData> {
  // TODO: APIからプロジェクトデータを取得する実装
  // 仮のデータを返す
  return {
    title: "プロジェクトA",
    description: "プロジェクトの説明",
    deadline: "2024-06-30",
    milestones: [
      {
        id: "1",
        title: "要件定義",
        startDate: new Date("2024-04-01"),
        endDate: new Date("2024-04-15"),
        progress: 100,
        color: "bg-blue-500",
        tasks: [
          {
            id: "1-1",
            title: "ヒアリング",
            startDate: new Date("2024-04-01"),
            endDate: new Date("2024-04-05"),
            completed: true,
          },
          {
            id: "1-2",
            title: "要件書作成",
            startDate: new Date("2024-04-06"),
            endDate: new Date("2024-04-15"),
            completed: true,
          },
        ],
      },
      {
        id: "2",
        title: "設計",
        startDate: new Date("2024-04-16"),
        endDate: new Date("2024-05-15"),
        progress: 60,
        color: "bg-green-500",
        tasks: [
          {
            id: "2-1",
            title: "基本設計",
            startDate: new Date("2024-04-16"),
            endDate: new Date("2024-04-30"),
            completed: true,
          },
          {
            id: "2-2",
            title: "詳細設計",
            startDate: new Date("2024-05-01"),
            endDate: new Date("2024-05-15"),
            completed: false,
          },
        ],
      },
    ],
  };
}

async function generateSuggestions(
  projectData: ProjectData
): Promise<Suggestion[]> {
  // TODO: AIによる提案生成の実装
  // 仮のデータを返す
  return [
    {
      id: "1",
      type: "warning",
      title: "期限が迫っているタスクがあります",
      description:
        "詳細設計のタスクが期限まで1週間を切っています。タスクの進捗を確認し、必要に応じて対策を検討してください。",
      primaryAction: {
        label: "タスクを確認",
        onClick: () => {
          console.log("タスクを確認");
        },
      },
    },
    {
      id: "2",
      type: "improvement",
      title: "進捗報告の自動化を提案",
      description:
        "定期的な進捗報告をSlackに自動投稿する設定を追加することで、コミュニケーションの効率化が図れます。",
      primaryAction: {
        label: "設定する",
        onClick: () => {
          console.log("Slack連携を設定");
        },
      },
      secondaryAction: {
        label: "詳細を見る",
        onClick: () => {
          console.log("詳細を表示");
        },
      },
    },
  ];
}

function calculateOverallProgress(milestones: Milestone[]): number {
  if (milestones.length === 0) return 0;

  const totalProgress = milestones.reduce(
    (sum, milestone) => sum + milestone.progress,
    0
  );
  return Math.round(totalProgress / milestones.length);
}

async function toggleTaskCompletion(
  projectId: string,
  milestoneId: string,
  taskId: string
) {
  // TODO: APIを呼び出してタスクの完了状態を更新する実装
  console.log("Toggle task completion:", { projectId, milestoneId, taskId });
}

type Props = {
  params: {
    id: string;
  };
};

export default async function ProjectDetailContainer({ params }: Props) {
  const projectData = await getProjectData(params.id);
  if (!projectData) {
    notFound();
  }

  const suggestions = await generateSuggestions(projectData);
  const overallProgress = calculateOverallProgress(projectData.milestones);

  return (
    <Presentational
      projectData={projectData}
      suggestions={suggestions}
      overallProgress={overallProgress}
      toggleTaskCompletion={(milestoneId: string, taskId: string) =>
        toggleTaskCompletion(params.id, milestoneId, taskId)
      }
    />
  );
}

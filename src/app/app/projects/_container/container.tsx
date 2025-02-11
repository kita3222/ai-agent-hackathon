import Presentational, { type Project } from "./presentational";

const data: Project[] = [
  {
    id: "GOAL-1",
    title: "論文を書き上げる",
    description: "3ヶ月で修士論文を完成させる",
    type: "learning",
    status: "in-progress",
    target: {
      value: 1,
      unit: "本",
      date: "2024-06-30",
    },
    progress: 30,
    icon: "graduation-cap",
  },
  {
    id: "GOAL-2",
    title: "プログラミング学習",
    description: "6ヶ月でWebアプリケーションを作成",
    type: "personal",
    status: "struggling",
    target: {
      value: 1,
      unit: "アプリ",
      date: "2024-12-31",
    },
    progress: 15,
    icon: "rocket",
  },
  {
    id: "GOAL-3",
    title: "業務効率化プロジェクト",
    description: "3ヶ月で部署の業務プロセスを20%効率化",
    type: "work",
    status: "not-started",
    target: {
      value: 20,
      unit: "%",
      date: "2024-09-30",
    },
    progress: 0,
    icon: "briefcase",
  },
];

export default function ProjectListContainer() {
  // TODO: APIからプロジェクトデータを取得する実装
  return <Presentational projects={data} />;
}

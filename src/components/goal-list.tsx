"use client"
import { Book, Briefcase, GraduationCap, Rocket } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export type Goal = {
  id: string
  title: string
  description: string
  type: "personal" | "work" | "learning" | "health"
  status: "not-started" | "in-progress" | "completed" | "struggling"
  target: {
    value: number
    unit: string
    date: string
  }
  progress: number
  icon: "book" | "briefcase" | "graduation-cap" | "rocket"
}

const data: Goal[] = [
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
]

function GoalIcon({ type }: { type: Goal["icon"] }) {
  switch (type) {
    case "book":
      return <Book className="h-4 w-4" />
    case "briefcase":
      return <Briefcase className="h-4 w-4" />
    case "graduation-cap":
      return <GraduationCap className="h-4 w-4" />
    case "rocket":
      return <Rocket className="h-4 w-4" />
  }
}

function StatusBadge({ status }: { status: Goal["status"] }) {
  const variants = {
    "not-started": "bg-slate-100 text-slate-700",
    "in-progress": "bg-blue-50 text-blue-700",
    completed: "bg-green-50 text-green-700",
    struggling: "bg-red-50 text-red-700",
  }

  const labels = {
    "not-started": "未着手",
    "in-progress": "進行中",
    completed: "完了",
    struggling: "苦戦中",
  }

  return (
    <Badge variant="secondary" className={`${variants[status]} border-0 text-xs`}>
      {labels[status]}
    </Badge>
  )
}

export function GoalList() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">あなたのゴール</h2>
          <p className="text-sm text-muted-foreground">一歩ずつ前進しましょう。小さな進捗も大切です。</p>
        </div>
        <Button size="sm" asChild>
          <Link href="/goals/new">新しいゴールを設定</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((goal) => (
          <Card key={goal.id} className="relative overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="p-1.5 bg-slate-100 rounded-md dark:bg-slate-800">
                  <GoalIcon type={goal.icon} />
                </div>
                <StatusBadge status={goal.status} />
              </div>

              <h3 className="font-semibold text-base mb-0.5">{goal.title}</h3>
              <p className="text-xs text-muted-foreground mb-3">{goal.description}</p>

              <div className="space-y-2.5">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>進捗</span>
                    <span className="font-medium">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-1.5" />
                </div>

                <div className="flex justify-between items-baseline">
                  <div className="space-y-0.5">
                    <span className="text-lg font-semibold">
                      {goal.target.value}
                      {goal.target.unit}
                    </span>
                    <span className="text-xs text-muted-foreground block">目標</span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Book className="h-3 w-3 mr-1" />
                    期限:{" "}
                    {new Date(goal.target.date).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button variant="ghost" size="sm" className="w-full h-8 text-xs" asChild>
                <Link href={`/goals/${goal.id}`}>詳細・タスク分解</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}


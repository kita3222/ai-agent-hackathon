import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { format } from "date-fns"

type ProjectHeaderProps = {
  title: string
  description: string
  deadline: Date
  progress: number
}

export function ProjectHeader({ title, description, deadline, progress }: ProjectHeaderProps) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <p className="text-lg mb-6">{description}</p>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>進捗状況</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="w-full" />
          <p className="mt-2 text-sm text-muted-foreground">目標期限: {format(deadline, "yyyy年MM月dd日")}</p>
        </CardContent>
      </Card>
    </>
  )
}


"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function GoalCreationForm() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [targetDate, setTargetDate] = useState("")
  const [goalType, setGoalType] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log({ title, description, targetDate, goalType })
    // Redirect to the task suggestion page with the new goal details
    router.push(
      `/goals/suggest?goal=${encodeURIComponent(title)}&deadline=${encodeURIComponent(targetDate)}&description=${encodeURIComponent(description)}&type=${encodeURIComponent(goalType)}`,
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>新しいゴールの詳細</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">目標のタイトル</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="例: 3ヶ月で修士論文を完成させる"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">目標の詳細説明</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="例: 先行研究のレビュー、データ収集、分析、執筆のスケジュールを立てて実行する"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="goalType">目標の種類</Label>
            <Select value={goalType} onValueChange={setGoalType} required>
              <SelectTrigger>
                <SelectValue placeholder="目標の種類を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">個人的</SelectItem>
                <SelectItem value="work">仕事</SelectItem>
                <SelectItem value="learning">学習</SelectItem>
                <SelectItem value="health">健康</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="targetDate">目標期限</Label>
            <Input
              id="targetDate"
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            目標を設定してタスク分解へ
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}


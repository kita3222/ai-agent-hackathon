"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export function ProjectCreationForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log({ title, description, targetDate });
    // Redirect to the task suggestion page with the new goal details
    router.push(
      `/projects/suggest?goal=${encodeURIComponent(
        title
      )}&deadline=${encodeURIComponent(
        targetDate
      )}&description=${encodeURIComponent(description)}`
    );
  };

  return (
    <Card>
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
  );
}

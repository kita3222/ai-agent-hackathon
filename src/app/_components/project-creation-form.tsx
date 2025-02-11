"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { Textarea } from "@/app/_components/ui/textarea";
import { Card, CardContent } from "@/app/_components/ui/card";

export function ProjectCreationForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/app/projects/suggest?goal=${encodeURIComponent(
        title
      )}&deadline=${encodeURIComponent(
        targetDate
      )}&description=${encodeURIComponent(description)}`
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">目標のタイトル</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="例: 3ヶ月で修士論文を完成させる"
                  className="h-10"
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
                  className="min-h-[100px] resize-none"
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
                  className="h-10"
                />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => router.push("/app/projects")}>
          キャンセル
        </Button>
        <Button type="submit" onClick={handleSubmit}>
          目標を設定する
        </Button>
      </div>
    </div>
  );
}

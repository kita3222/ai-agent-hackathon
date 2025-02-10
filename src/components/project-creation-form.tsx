"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FlagIcon } from "lucide-react";

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
    <div className="flex min-h-[80vh] flex-col items-center justify-center w-full">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <FlagIcon className="h-8 w-8 text-primary mb-4" />
          <h2 className="text-2xl font-bold tracking-tight">
            新しい目標を設定
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            目標の詳細を入力して、達成までの計画を立てましょう
          </p>
        </div>

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

          <Button type="submit" className="w-full">
            目標を設定する
          </Button>
        </form>
      </div>
    </div>
  );
}

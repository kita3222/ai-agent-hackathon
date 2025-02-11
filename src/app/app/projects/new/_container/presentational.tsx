"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

type PresentationalProps = {
  title: string;
  description: string;
  targetDate: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onTargetDateChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
};

export default function Presentational({
  title,
  description,
  targetDate,
  onTitleChange,
  onDescriptionChange,
  onTargetDateChange,
  onSubmit,
  onCancel,
}: PresentationalProps) {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">目標のタイトル</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => onTitleChange(e.target.value)}
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
                  onChange={(e) => onDescriptionChange(e.target.value)}
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
                  onChange={(e) => onTargetDateChange(e.target.value)}
                  required
                  className="h-10"
                />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          キャンセル
        </Button>
        <Button type="submit" onClick={onSubmit}>
          目標を設定する
        </Button>
      </div>
    </div>
  );
}

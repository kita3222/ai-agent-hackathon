"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function toggleTaskCompletion(
  projectId: string,
  milestoneId: string,
  taskId: string
): Promise<{ success?: boolean; error?: string }> {
  try {
    const supabase = createClient(cookies());

    // 現在のタスクの状態を取得
    const { data: task, error: fetchError } = await supabase
      .from("tasks")
      .select("completed")
      .eq("id", taskId)
      .single();

    if (fetchError) {
      throw new Error("タスクの取得に失敗しました");
    }

    // タスクの完了状態を反転
    const { error: updateError } = await supabase
      .from("tasks")
      .update({ completed: !task.completed })
      .eq("id", taskId);

    if (updateError) {
      throw new Error("タスクの更新に失敗しました");
    }

    // キャッシュを更新
    revalidatePath(`/app/projects/${projectId}`);

    return { success: true };
  } catch (error) {
    console.error("Error toggling task completion:", error);
    return { error: "タスクの更新中にエラーが発生しました" };
  }
} 
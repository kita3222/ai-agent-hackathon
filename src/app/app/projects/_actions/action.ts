"use server";

import { createClient } from "@/lib/supabase/server";
import { Database } from "database.types";
import { cookies } from "next/headers";

/**
 * Supabase の Project テーブルからプロジェクト一覧を取得するサーバーアクション
 */
export async function fetchProjects(): Promise<{ projects?: Database['public']['Tables']['projects']['Row'][]; error?: string }> {
  try {
    const supabase = createClient(cookies());
    const { data, error } = await supabase.from("projects").select("*");

    if (error || !data) {
      throw error || new Error("プロジェクトデータの取得に失敗しました");
    }

    return { projects: data as Database["public"]["Tables"]["projects"]["Row"][] };
  } catch (error: any) {
    console.error("Error fetching projects:", error);
    return { error: "プロジェクトデータの取得中にエラーが発生しました" };
  }
} 
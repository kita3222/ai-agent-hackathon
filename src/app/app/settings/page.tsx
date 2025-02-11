import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SectionHeader from "@/components/layouts/section-header";

export default async function SettingsPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <SectionHeader
        title="設定"
        subtitle="アカウントの設定を管理します"
      />
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-lg font-medium">プロフィール</h2>
          <div className="space-y-1">
            <p className="text-sm font-medium">メールアドレス</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 
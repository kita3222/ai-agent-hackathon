import Image from "next/image";
import Link from "next/link";
import { UserAuthForm } from "../_components/user-auth-form";
import Logo from "@/components/logo";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 md:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Logo width={80} height={80} />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to AiDo
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>すでにアカウントをお持ちの方は</span>
            <Link
              href="/auth/sign-in"
              className="font-medium text-primary hover:underline"
            >
              サインイン
            </Link>
          </div>
        </div>
        <UserAuthForm isSignUp />
        <p className="px-8 text-center text-xs text-muted-foreground">
          アカウントを作成することで、
          <Link
            href="/terms"
            className="hover:text-brand underline underline-offset-1"
          >
            利用規約
          </Link>
          と
          <Link
            href="/privacy"
            className="hover:text-brand underline underline-offset-1"
          >
            プライバシーポリシー
          </Link>
          に同意したことになります。
        </p>
      </div>
    </div>
  );
}

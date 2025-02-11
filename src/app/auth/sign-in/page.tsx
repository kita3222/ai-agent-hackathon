import Image from "next/image";
import Link from "next/link";
import { UserAuthForm } from "../_components/user-auth-form";
import Logo from "@/components/logo";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 md:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Logo width={80} height={80} />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to AiDo
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>アカウントをお持ちでない方は</span>
            <Link
              href="/auth/sign-up"
              className="font-medium text-primary hover:underline"
            >
              新規登録
            </Link>
          </div>
        </div>
        <UserAuthForm />
      </div>
    </div>
  );
}

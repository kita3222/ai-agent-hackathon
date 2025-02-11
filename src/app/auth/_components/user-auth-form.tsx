"use client";

import * as React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { useToast } from "@/components/ui/use-toast";
import { signIn, signUp, signInWithGoogle } from "../_actions/auth";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  isSignUp?: boolean;
}

function SubmitButton({ isSignUp }: { isSignUp: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending}>
      {pending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      {isSignUp ? "アカウントを作成" : "サインイン"}
    </Button>
  );
}

export function UserAuthForm({
  className,
  isSignUp = false,
  ...props
}: UserAuthFormProps) {
  const { toast } = useToast();
  const [_, formAction] = useFormState(
    async (prevState: any, formData: FormData) => {
      const result = isSignUp ? await signUp(formData) : await signIn(formData);

      if (result?.error) {
        toast({
          title: "エラーが発生しました",
          description: result.error,
          variant: "destructive",
        });
      }

      if (isSignUp) {
        toast({
          title: "アカウントを作成しました。",
          description:
            "確認メールを送信しました。メールに記載されたリンクから認証を完了してください。",
        });
      }

      return { ...prevState, ...result, isSignUp };
    },
    { isSignUp }
  );

  const handleGoogleSignIn = async () => {
    const result = await signInWithGoogle();
    if (result?.error) {
      toast({
        title: "エラーが発生しました",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  return (
    <div className={className} {...props}>
      <div className="flex flex-col gap-5">
        <form action={formAction} className="grid gap-4">
          <div className="grid gap-1">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              required
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password">パスワード</Label>
            <Input
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              autoCapitalize="none"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              autoCorrect="off"
              required
            />
          </div>
          <SubmitButton isSignUp={isSignUp} />
        </form>

        <div className="flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground text-center">
            または
          </span>
        </div>
        <Button
          variant="outline"
          type="button"
          className="w-full"
          onClick={handleGoogleSignIn}
        >
          <Icons.google className="mr-2 h-4 w-4" />
          Googleで{isSignUp ? "アカウントを作成" : "サインイン"}
        </Button>
      </div>
    </div>
  );
}

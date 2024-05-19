"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [loading, setLoading] = useState<{ google: boolean }>({
    google: false,
  });

  const onClick = async (provider: "google") => {
    setLoading((prev) => ({ ...prev, [provider]: true }));
    await signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => onClick("google")}
        disabled={loading.google}
      >
        {loading.google ? "Loading..." : <FcGoogle className="h-5 w-5" />}
      </Button>
    </div>
  );
};

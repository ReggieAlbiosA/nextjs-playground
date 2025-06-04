// components/GithubSignIn.tsx
"use client";

import { Loader2, Github } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { useState } from "react";
import { signIn } from "@/lib/auth-client"; // Ensure this path is correct

export default function GithubSignInButton({ className, showText = true }: { className?: string, showText?: boolean }) {
  const [loading, setLoading] = useState(false);

  const handleGithubSignInClick = async () => {
    await signIn.social(
    {
      provider: "github",
    },
    {
      onRequest() {
        setLoading(true);
      },
      onError() {
        setLoading(false);
        // Consider adding toast error here
      },
      onSuccess() {
        // setLoadingState(false); // Typically, onSuccess will navigate away
        localStorage.setItem(
          "auth-event",
          JSON.stringify({ event: "signed-in", timestamp: Date.now() })
        );
      },
    }
  );
  };

  return (
    <>
      {loading && (
        <div className="absolute inset-0 z-[9999] w-screen h-screen flex items-center secondary-bg justify-center  animate-in fade-in duration-300">
          <div className="flex flex-col items-center gap-4 duration-500 delay-150 ">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-sm font-medium">
              Redirecting...
            </span>
          </div>
        </div>
      )}

      <Button
        className={className ?? "card-bg flex items-center gap-2 rounded-md border px-3 cursor-pointer py-1.5 text-sm font-medium transition-colors hover:card-bg/10 disabled:opacity-50"}
        onClick={handleGithubSignInClick}
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Github size={16} />
        )}
        {showText && (
         <span className={showText ? "sm:inline" : "hidden sm:inline"}> {/* Control text visibility */}
            {loading ? "Signing in..." : "Continue with Github"}
          </span>
        )}
      </Button>
    </>
  );
}
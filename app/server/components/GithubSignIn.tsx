'use client'

import { Loader2, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { signIn } from "@/lib/auth-client"


export default function GithubSignIn() {
  const [loading, setLoading] = useState(false)

  const handleGithubSignIn = async () => {
      await signIn.social(
        { 
          provider: "github",
         },
        {
          onRequest() {
            setLoading(true)
          },
          onError() {
            setLoading(false)
          },
          onSuccess() {
            localStorage.setItem("auth-event", JSON.stringify({ event: "signed-in", timestamp: Date.now() }));
          }
        }
      )
  }

  return (
    <>
      {/* Overlay with smooth fade transitions */}
      {loading && (
        <div className="inset-0 z-[9999] w-screen h-screen flex items-center absolute dark:bg-black bg-white justify-center  backdrop-blur-sm animate-in fade-in duration-300">
          <div className="flex flex-col items-center gap-4 duration-500 delay-150 ">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-sm font-medium ">Redirecting...</span>
          </div>
        </div>
      )}

      <Button
        className="card-bg primary-text flex items-center gap-2 rounded-md border border-divider px-3 cursor-pointer py-1.5 text-sm font-medium transition-colors hover:card-bg/10 disabled:opacity-50"
        onClick={handleGithubSignIn}
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Github size={16} />
        )}
        <span className="hidden sm:inline">
          {loading ? "Signing in..." : "Continue with Github"}
        </span>
      </Button>
    </>
  )
}
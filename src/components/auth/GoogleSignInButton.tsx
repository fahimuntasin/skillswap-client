"use client"

import { forwardRef, useState } from "react"
import { Loader2 } from "lucide-react"
import { signInWithGoogle } from "@/lib/auth-client"
import { toast } from "sonner"

type GoogleSignInButtonProps = {
  className?: string
}

export const GoogleSignInButton = forwardRef<HTMLButtonElement, GoogleSignInButtonProps>(
  function GoogleSignInButton({ className }, ref) {
    const [loading, setLoading] = useState(false)

    const handleClick = async () => {
      setLoading(true)
      try {
        const ok = await signInWithGoogle()
        if (!ok) {
          setLoading(false)
          toast.error("Could not connect to Google. Please try again.")
        }
      } catch {
        setLoading(false)
        toast.error("Could not connect to Google. Please try again.")
      }
    }

    return (
      <>
        {loading && (
          <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white/90 dark:bg-[#0f0f1a]/90 backdrop-blur-sm">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-[#7C3AED]/10">
              <Loader2 className="size-7 animate-spin text-[#7C3AED]" />
            </div>
            <p className="mt-4 text-sm font-medium text-[#0F172A] dark:text-[#f8fafc]">Connecting to Google…</p>
            <p className="mt-1 text-xs text-[#64748B] dark:text-[#94a3b8]">Please wait, do not close this window</p>
          </div>
        )}
        <button
          ref={ref}
          type="button"
          disabled={loading}
          onClick={handleClick}
          className={
            className ||
            "group relative w-full h-11 rounded-lg flex items-center justify-center gap-2.5 text-[15px] font-medium border border-[#E2E8F0] dark:border-[#2a2a3e] bg-white dark:bg-[#1a1a2e] text-[#0F172A] dark:text-[#f8fafc] cursor-pointer transition-colors overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
          }
        >
          {loading ? (
            <>
              <Loader2 className="size-[18px] animate-spin shrink-0" />
              Connecting…
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" className="size-[18px] shrink-0">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </>
          )}
        </button>
      </>
    )
  }
)

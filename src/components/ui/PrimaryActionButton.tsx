"use client"

import { Loader2, ArrowRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"

type PrimaryActionButtonProps = {
  children: React.ReactNode
  loading?: boolean
  success?: boolean
  successLabel?: string
  disabled?: boolean
  type?: "button" | "submit"
  className?: string
  size?: "default" | "lg"
  onClick?: () => void
}

export function PrimaryActionButton({
  children,
  loading,
  success,
  successLabel = "Done!",
  disabled,
  type = "submit",
  className,
  size = "default",
  onClick,
}: PrimaryActionButtonProps) {
  const isDisabled = disabled || loading || success

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={cn(
        "group relative w-full overflow-hidden rounded-xl font-semibold text-white transition-all duration-300",
        "bg-gradient-to-r from-[#7C3AED] via-[#6D28D9] to-[#5B21B6]",
        "shadow-[0_4px_14px_rgba(124,58,237,0.4)] hover:shadow-[0_8px_24px_rgba(124,58,237,0.45)]",
        "hover:brightness-110 active:scale-[0.98]",
        "disabled:pointer-events-none disabled:opacity-60 disabled:shadow-none",
        success && "from-emerald-500 via-emerald-600 to-emerald-700 shadow-emerald-500/30",
        size === "lg" ? "h-12 text-[15px]" : "h-11 text-sm",
        className
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <span className="relative flex items-center justify-center gap-2 px-4">
        {loading ? (
          <>
            <Loader2 className="size-[18px] animate-spin" />
            <span>{children}</span>
          </>
        ) : success ? (
          <>
            <Check className="size-[18px]" strokeWidth={2.5} />
            <span>{successLabel}</span>
          </>
        ) : (
          <>
            <span>{children}</span>
            <ArrowRight className="size-[18px] transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </span>
    </button>
  )
}

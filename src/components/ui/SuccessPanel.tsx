"use client"

import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type SuccessPanelProps = {
  title: string
  description?: string
  actionLabel?: string
  actionHref?: string
  secondaryLabel?: string
  secondaryHref?: string
  className?: string
}

export function SuccessPanel({
  title,
  description,
  actionLabel,
  actionHref,
  secondaryLabel,
  secondaryHref,
  className,
}: SuccessPanelProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-emerald-200/80 dark:border-emerald-800/50 bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/40 dark:to-[#1c1a3a] p-6 text-center animate-in fade-in zoom-in-95 duration-300",
        className
      )}
    >
      <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40 ring-4 ring-emerald-100/80 dark:ring-emerald-900/30">
        <CheckCircle2 className="size-7 text-emerald-600 dark:text-emerald-400" strokeWidth={2} />
      </div>
      <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#f8fafc] mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-[#64748B] dark:text-[#94a3b8] mb-5 max-w-[280px] mx-auto leading-relaxed">{description}</p>
      )}
      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        {actionLabel && actionHref && (
          <Link href={actionHref}>
            <Button variant="plastic" className="w-full sm:w-auto h-10 px-6 rounded-lg">{actionLabel}</Button>
          </Link>
        )}
        {secondaryLabel && secondaryHref && (
          <Link href={secondaryHref}>
            <Button variant="outline" className="w-full sm:w-auto h-10 px-6 rounded-lg dark:border-[#2a2a3e]">{secondaryLabel}</Button>
          </Link>
        )}
      </div>
    </div>
  )
}

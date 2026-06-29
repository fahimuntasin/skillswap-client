"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="top-center"
      richColors
      closeButton
      expand
      visibleToasts={4}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4 text-emerald-600" />,
        info: <InfoIcon className="size-4 text-blue-600" />,
        warning: <TriangleAlertIcon className="size-4 text-amber-600" />,
        error: <OctagonXIcon className="size-4 text-red-600" />,
        loading: <Loader2Icon className="size-4 animate-spin text-[#7C3AED]" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast !rounded-xl !border !shadow-lg !font-medium dark:!bg-[#1c1a3a] dark:!border-[#2a2a3e]",
          title: "!text-[15px] !font-semibold",
          description: "!text-[13px] !opacity-90",
          success: "!border-emerald-200 dark:!border-emerald-800/50",
          error: "!border-red-200 dark:!border-red-900/50",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

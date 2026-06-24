import { Loader } from "@/components/ui/Loader"

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background dark:bg-[#0a0a0b]">
      <Loader />
    </div>
  )
}

import { BookmarkIcon } from "lucide-react"
import { useBookmarks } from "@/lib/bookmarks"

export function BookmarkButton({ taskId }: { taskId: string }) {
  const { toggleBookmark, isBookmarked } = useBookmarks()
  const saved = isBookmarked(taskId)

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleBookmark(taskId) }}
      className={`absolute top-3 right-3 size-8 rounded-full flex items-center justify-center transition-colors ${saved ? "bg-[#7C3AED] text-white" : "bg-white dark:bg-[#1a1a2e] text-[#94A3B8] hover:text-[#7C3AED] border border-[#E2E8F0] dark:border-[#2a2a3e]"}`}
    >
      <BookmarkIcon className={`size-4 ${saved ? "fill-white" : ""}`} />
    </button>
  )
}

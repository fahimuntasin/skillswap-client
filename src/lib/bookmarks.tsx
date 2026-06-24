"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type BookmarksContextType = {
  bookmarks: string[]
  toggleBookmark: (taskId: string) => void
  isBookmarked: (taskId: string) => boolean
}

const BookmarksContext = createContext<BookmarksContextType>({
  bookmarks: [], toggleBookmark: () => {}, isBookmarked: () => false,
})

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("skillswap-bookmarks")
    if (stored) setBookmarks(JSON.parse(stored))
  }, [])

  const toggleBookmark = (taskId: string) => {
    setBookmarks(prev => {
      const next = prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
      localStorage.setItem("skillswap-bookmarks", JSON.stringify(next))
      return next
    })
  }

  const isBookmarked = (taskId: string) => bookmarks.includes(taskId)

  return (
    <BookmarksContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarksContext.Provider>
  )
}

export const useBookmarks = () => useContext(BookmarksContext)

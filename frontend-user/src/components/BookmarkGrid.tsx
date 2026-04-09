import { Bookmark as BookmarkIcon } from 'lucide-react'
import { BookmarkCard } from './BookmarkCard'
import type { Bookmark, Category } from '../types'

interface BookmarkGridProps {
  bookmarks: Bookmark[]
  categories: Category[]
  onEdit: (bookmark: Bookmark) => void
  onDelete: (id: string) => void
}

export function BookmarkGrid({ bookmarks, categories, onEdit, onDelete }: BookmarkGridProps) {
  const getCategoryById = (id: string) => categories.find((c) => c.id === id)

  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <BookmarkIcon className="w-10 h-10 text-gray-300" />
        </div>
        <p className="text-lg font-medium text-gray-500 mb-1">暂无书签</p>
        <p className="text-sm text-gray-400">点击右下角按钮添加你的第一个书签</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {bookmarks.map((bookmark) => (
        <BookmarkCard
          key={bookmark.id}
          bookmark={bookmark}
          category={getCategoryById(bookmark.categoryId)}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

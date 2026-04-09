import { ExternalLink, Trash2, Edit2 } from 'lucide-react'
import type { Bookmark, Category } from '../types'

interface BookmarkCardProps {
  bookmark: Bookmark
  category?: Category
  onEdit: (bookmark: Bookmark) => void
  onDelete: (id: string) => void
}

export function BookmarkCard({ bookmark, category, onEdit, onDelete }: BookmarkCardProps) {
  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
    } catch {
      return null
    }
  }

  return (
    <div className="group relative bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md hover:border-gray-200 transition-all duration-200">
      <a
        href={bookmark.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="flex items-start gap-3">
          {/* 图标 */}
          <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-100">
            {bookmark.favicon || getFaviconUrl(bookmark.url) ? (
              <img
                src={bookmark.favicon || getFaviconUrl(bookmark.url)!}
                alt=""
                className="w-6 h-6 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  target.parentElement!.innerHTML = '<span class="text-gray-400">🔗</span>'
                }}
              />
            ) : (
              <ExternalLink className="w-5 h-5 text-gray-400" />
            )}
          </div>
          
          {/* 内容 */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-800 text-sm truncate leading-tight">
              {bookmark.title}
            </h3>
            <p className="text-xs text-gray-400 truncate mt-1">
              {bookmark.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            </p>
            {bookmark.description && (
              <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                {bookmark.description}
              </p>
            )}
          </div>
        </div>
        
        {/* 分类标签 */}
        {category && (
          <div className="mt-3 pt-3 border-t border-gray-50">
            <span
              className="inline-flex items-center text-xs px-2 py-1 rounded-md font-medium"
              style={{ 
                backgroundColor: `${category.color}15`, 
                color: category.color 
              }}
            >
              {category.icon} {category.name}
            </span>
          </div>
        )}
      </a>

      {/* 操作按钮 */}
      <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onEdit(bookmark)
          }}
          className="p-1.5 bg-white rounded-md shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
          title="编辑"
        >
          <Edit2 className="w-3.5 h-3.5 text-gray-500" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onDelete(bookmark.id)
          }}
          className="p-1.5 bg-white rounded-md shadow-sm border border-gray-100 hover:bg-red-50 transition-colors"
          title="删除"
        >
          <Trash2 className="w-3.5 h-3.5 text-red-400" />
        </button>
      </div>
    </div>
  )
}

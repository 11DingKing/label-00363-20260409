import { X, ChevronDown, Check } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import type { Bookmark, Category } from '../types'

interface BookmarkModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => void
  onUpdate?: (id: string, updates: Partial<Bookmark>) => void
  categories: Category[]
  editingBookmark?: Bookmark | null
}

export function BookmarkModal({
  isOpen,
  onClose,
  onSave,
  onUpdate,
  categories,
  editingBookmark,
}: BookmarkModalProps) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('default')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    
    if (editingBookmark) {
      setTitle(editingBookmark.title)
      setUrl(editingBookmark.url)
      setDescription(editingBookmark.description || '')
      setCategoryId(editingBookmark.categoryId)
    } else {
      setTitle('')
      setUrl('')
      setDescription('')
      setCategoryId('default')
    }
    setIsDropdownOpen(false)
  }, [editingBookmark, isOpen])

  // 点击外部关闭下拉框
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !url.trim()) return

    // 自动添加 https:// 前缀
    let finalUrl = url.trim()
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = 'https://' + finalUrl
    }

    if (editingBookmark && onUpdate) {
      onUpdate(editingBookmark.id, { title, url: finalUrl, description, categoryId })
    } else {
      onSave({ title, url: finalUrl, description, categoryId })
    }
    onClose()
  }

  const selectedCategory = categories.find(c => c.id === categoryId)

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">
            {editingBookmark ? '✏️ 编辑书签' : '➕ 添加书签'}
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              标题 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="输入网站标题"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              网址 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="www.baidu.com 或 https://example.com"
              required
            />
          </div>

          <div ref={dropdownRef} className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">分类</label>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full px-3 py-2.5 text-sm border rounded-lg bg-white flex items-center justify-between transition-all ${
                isDropdownOpen 
                  ? 'border-blue-500 ring-2 ring-blue-500' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg text-lg">
                  {selectedCategory?.icon}
                </span>
                <span className="text-gray-700">{selectedCategory?.name}</span>
              </span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform mr-1 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1 max-h-48 overflow-auto">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setCategoryId(cat.id)
                      setIsDropdownOpen(false)
                    }}
                    className={`w-full px-3 py-2 text-sm text-left flex items-center justify-between hover:bg-gray-50 transition-colors ${
                      categoryId === cat.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg text-lg">
                        {cat.icon}
                      </span>
                      <span className="text-gray-700">{cat.name}</span>
                    </span>
                    {categoryId === cat.id && <Check className="w-4 h-4 text-blue-500" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              描述 <span className="text-gray-400 font-normal">(可选)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
              placeholder="添加一些描述..."
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              取消
            </button>
            <button 
              type="submit" 
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
            >
              {editingBookmark ? '保存修改' : '添加书签'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

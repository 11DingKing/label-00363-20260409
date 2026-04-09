import { X } from 'lucide-react'
import { useState, useEffect } from 'react'
import type { Category } from '../types'

interface CategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (category: Omit<Category, 'id' | 'order'>) => void
  onUpdate?: (id: string, updates: Partial<Category>) => void
  editingCategory?: Category | null
}

// 常用 emoji 列表
const EMOJI_OPTIONS = [
  '📁', '📂', '🏠', '💼', '🎮', '🎬', '🎵', '📚',
  '💻', '🛠️', '🛒', '✈️', '🍔', '⚽', '🎨', '📷',
  '💰', '❤️', '⭐', '🔥', '📱', '🎯', '🚀', '💡',
]

export function CategoryModal({
  isOpen,
  onClose,
  onSave,
  onUpdate,
  editingCategory,
}: CategoryModalProps) {
  const [name, setName] = useState(editingCategory?.name ?? '')
  const [icon, setIcon] = useState(editingCategory?.icon ?? '📁')

  // 当 editingCategory 变化时更新表单
  useEffect(() => {
    setName(editingCategory?.name ?? '')
    setIcon(editingCategory?.icon ?? '📁')
  }, [editingCategory])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    if (editingCategory && onUpdate) {
      onUpdate(editingCategory.id, { name: name.trim(), icon })
    } else {
      onSave({ name: name.trim(), icon })
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">
            {editingCategory ? '✏️ 编辑分类' : '➕ 添加分类'}
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
              分类名称 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 10))}
              maxLength={10}
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="最多10个字符"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">图标</label>
            <div className="grid grid-cols-8 gap-1.5">
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIcon(emoji)}
                  className={`w-9 h-9 text-lg rounded-lg transition-all ${
                    icon === emoji
                      ? 'bg-blue-100 ring-2 ring-blue-500'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
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
              {editingCategory ? '保存修改' : '添加分类'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

import { Plus, Trash2, Edit2, AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import type { Category } from '../types'
import { CategoryModal } from './CategoryModal'

interface CategorySidebarProps {
  categories: Category[]
  selectedCategory: string | null
  onSelectCategory: (id: string | null) => void
  onAddCategory: (category: Omit<Category, 'id' | 'order'>) => void
  onDeleteCategory: (id: string) => void
  onUpdateCategory: (id: string, updates: Partial<Category>) => void
}

export function CategorySidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  onAddCategory,
  onDeleteCategory,
  onUpdateCategory,
}: CategorySidebarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null)

  const handleAdd = () => {
    setEditingCategory(null)
    setIsModalOpen(true)
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
    setEditingCategory(null)
  }

  const handleConfirmDelete = () => {
    if (deletingCategory) {
      // 如果删除的是当前选中的分类，切换到全部书签
      if (selectedCategory === deletingCategory.id) {
        onSelectCategory(null)
      }
      onDeleteCategory(deletingCategory.id)
      setDeletingCategory(null)
    }
  }

  return (
    <>
      <aside className="w-60 bg-white/90 backdrop-blur-sm h-screen flex flex-col border-r border-gray-200">
        {/* 标题 */}
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-800">📂 分类管理</h2>
        </div>

        {/* 全部书签 */}
        <div className="px-3 pt-3">
          <button
            onClick={() => onSelectCategory(null)}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
              selectedCategory === null
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            📋 全部书签
          </button>
        </div>

        {/* 分类列表 */}
        <div className="flex-1 overflow-y-auto px-3 py-2">
          <div className="space-y-1">
            {categories.map((category) => (
              <div key={category.id} className="group relative">
                <button
                  onClick={() => onSelectCategory(category.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 flex items-center justify-between ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="truncate pr-14">{category.icon} {category.name}</span>
                </button>
                {/* 操作按钮 */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-0.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEdit(category)
                    }}
                    className={`p-1.5 rounded-md transition-colors ${
                      selectedCategory === category.id
                        ? 'hover:bg-blue-400 text-white/80 hover:text-white'
                        : 'hover:bg-gray-200 text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  {category.id !== 'default' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setDeletingCategory(category)
                      }}
                      className={`p-1.5 rounded-md transition-colors ${
                        selectedCategory === category.id
                          ? 'hover:bg-red-400 text-white/80 hover:text-white'
                          : 'hover:bg-red-100 text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 添加分类按钮 */}
        <div className="p-3 border-t border-gray-100">
          <button
            onClick={handleAdd}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all border-2 border-dashed border-gray-200 hover:border-blue-300"
          >
            <Plus className="w-4 h-4" /> 添加分类
          </button>
        </div>
      </aside>

      {/* 分类编辑弹窗 */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSave={onAddCategory}
        onUpdate={onUpdateCategory}
        editingCategory={editingCategory}
      />

      {/* 删除确认弹窗 */}
      {deletingCategory && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setDeletingCategory(null)}
        >
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">确认删除</h3>
            <p className="text-sm text-gray-600 mb-6">
              确定要删除分类「{deletingCategory.icon} {deletingCategory.name}」吗？<br />该分类下的书签不会被删除。
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setDeletingCategory(null)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
              <button 
                onClick={handleConfirmDelete}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
              >
                删除
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

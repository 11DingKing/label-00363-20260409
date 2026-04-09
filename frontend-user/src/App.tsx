import { useState, useMemo, useEffect } from 'react'
import { Plus, RefreshCw } from 'lucide-react'
import { SearchBar } from './components/SearchBar'
import { CategorySidebar } from './components/CategorySidebar'
import { BookmarkGrid } from './components/BookmarkGrid'
import { BookmarkModal } from './components/BookmarkModal'
import { useBookmarks } from './hooks/useBookmarks'
import type { Bookmark } from './types'

function App() {
  const {
    bookmarks,
    categories,
    loading,
    addBookmark,
    updateBookmark,
    deleteBookmark,
    addCategory,
    updateCategory,
    deleteCategory,
    importFromExtension,
  } = useBookmarks()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'BROWSER_NAV_ADD_BOOKMARK') {
        const { title, url, favicon, categoryId } = event.data.payload
        addBookmark({
          title,
          url,
          favicon,
          categoryId: categoryId || 'default',
        })
      } else if (event.data?.type === 'BROWSER_NAV_SYNC') {
        importFromExtension(event.data.payload)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [addBookmark, importFromExtension])

  const filteredBookmarks = useMemo(() => {
    return bookmarks
      .filter((b) => {
        if (selectedCategory && b.categoryId !== selectedCategory) return false
        if (searchQuery) {
          const query = searchQuery.toLowerCase()
          return (
            b.title.toLowerCase().includes(query) ||
            b.url.toLowerCase().includes(query) ||
            b.description?.toLowerCase().includes(query)
          )
        }
        return true
      })
      .sort((a, b) => b.createdAt - a.createdAt)
  }, [bookmarks, selectedCategory, searchQuery])

  const handleEdit = (bookmark: Bookmark) => {
    setEditingBookmark(bookmark)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingBookmark(null)
  }

  const selectedCategoryName = selectedCategory 
    ? categories.find(c => c.id === selectedCategory)?.name 
    : '全部书签'

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="h-screen flex bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <CategorySidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onAddCategory={addCategory}
        onDeleteCategory={deleteCategory}
        onUpdateCategory={updateCategory}
      />

      <main className="flex-1 flex flex-col min-w-0">
        {/* 顶部区域 */}
        <header className="flex-shrink-0 px-8 pt-8 pb-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">🌐 我的导航</h1>
            <p className="text-sm text-gray-500 mt-1">快速访问你收藏的网站</p>
          </div>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </header>

        {/* 内容区域 */}
        <div className="flex-1 overflow-auto px-8 pb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-600">
              {selectedCategoryName}
              <span className="ml-2 text-gray-400">({filteredBookmarks.length})</span>
            </h2>
          </div>
          
          <BookmarkGrid
            bookmarks={filteredBookmarks}
            categories={categories}
            onEdit={handleEdit}
            onDelete={deleteBookmark}
          />
        </div>

        {/* 添加按钮 */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 hover:shadow-xl hover:scale-105 transition-all duration-200"
          title="添加书签"
        >
          <Plus className="w-6 h-6" />
        </button>

        <BookmarkModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={addBookmark}
          onUpdate={updateBookmark}
          categories={categories}
          editingBookmark={editingBookmark}
        />
      </main>
    </div>
  )
}

export default App

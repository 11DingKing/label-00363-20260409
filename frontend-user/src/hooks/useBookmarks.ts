import { useState, useEffect, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { Bookmark, Category } from '../types'

const STORAGE_KEY = 'browser-nav-data'

const defaultCategories: Category[] = [
  { id: 'default', name: '默认', icon: '📁', color: '#6b7280', order: 0 },
  { id: 'work', name: '工作', icon: '💼', color: '#3b82f6', order: 1 },
  { id: 'study', name: '学习', icon: '📚', color: '#10b981', order: 2 },
  { id: 'entertainment', name: '娱乐', icon: '🎮', color: '#f59e0b', order: 3 },
  { id: 'tools', name: '工具', icon: '🔧', color: '#8b5cf6', order: 4 },
]

interface StorageData {
  bookmarks: Bookmark[]
  categories: Category[]
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [categories, setCategories] = useState<Category[]>(defaultCategories)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const data: StorageData = JSON.parse(stored)
        setBookmarks(data.bookmarks || [])
        setCategories(data.categories || defaultCategories)
      } catch {
        console.error('Failed to parse stored data')
      }
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ bookmarks, categories }))
    }
  }, [bookmarks, categories, loading])

  const addBookmark = useCallback((bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => {
    const newBookmark: Bookmark = {
      ...bookmark,
      id: uuidv4(),
      createdAt: Date.now(),
    }
    setBookmarks(prev => [...prev, newBookmark])
    return newBookmark
  }, [])

  const updateBookmark = useCallback((id: string, updates: Partial<Bookmark>) => {
    setBookmarks(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b))
  }, [])

  const deleteBookmark = useCallback((id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id))
  }, [])

  const addCategory = useCallback((category: Omit<Category, 'id' | 'order'>) => {
    const newCategory: Category = {
      ...category,
      id: uuidv4(),
      order: categories.length,
    }
    setCategories(prev => [...prev, newCategory])
    return newCategory
  }, [categories.length])

  const updateCategory = useCallback((id: string, updates: Partial<Category>) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c))
  }, [])

  const deleteCategory = useCallback((id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id))
    setBookmarks(prev => prev.map(b => b.categoryId === id ? { ...b, categoryId: 'default' } : b))
  }, [])

  const importFromExtension = useCallback((data: { bookmarks: Bookmark[], categories?: Category[] }) => {
    if (data.bookmarks) {
      setBookmarks(prev => {
        const existingUrls = new Set(prev.map(b => b.url))
        const newBookmarks = data.bookmarks.filter(b => !existingUrls.has(b.url))
        return [...prev, ...newBookmarks]
      })
    }
    if (data.categories) {
      setCategories(prev => {
        const existingIds = new Set(prev.map(c => c.id))
        const newCategories = data.categories!.filter(c => !existingIds.has(c.id))
        return [...prev, ...newCategories]
      })
    }
  }, [])

  return {
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
  }
}

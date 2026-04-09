export interface Bookmark {
  id: string
  title: string
  url: string
  favicon?: string
  categoryId: string
  createdAt: number
  description?: string
}

export interface Category {
  id: string
  name: string
  icon?: string
  color?: string
  order: number
}

export interface AppState {
  bookmarks: Bookmark[]
  categories: Category[]
  searchQuery: string
  selectedCategory: string | null
}

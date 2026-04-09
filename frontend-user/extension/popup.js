const DEFAULT_NAV_URL = 'http://localhost:5173'

document.addEventListener('DOMContentLoaded', async () => {
  const titleInput = document.getElementById('title')
  const urlInput = document.getElementById('url')
  const descriptionInput = document.getElementById('description')
  const categorySelect = document.getElementById('category')
  const saveBtn = document.getElementById('save-btn')
  const syncBtn = document.getElementById('sync-btn')
  const navUrlInput = document.getElementById('nav-url')
  const formView = document.getElementById('form-view')
  const successView = document.getElementById('success-view')

  // 加载保存的导航页地址
  const stored = await chrome.storage.local.get(['navUrl', 'categories'])
  navUrlInput.value = stored.navUrl || DEFAULT_NAV_URL

  // 如果有自定义分类，更新下拉框
  if (stored.categories && stored.categories.length > 0) {
    categorySelect.innerHTML = stored.categories
      .map(cat => `<option value="${cat.id}">${cat.icon} ${cat.name}</option>`)
      .join('')
  }

  // 获取当前标签页信息
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  if (tab) {
    titleInput.value = tab.title || ''
    urlInput.value = tab.url || ''
  }

  // 保存导航页地址
  navUrlInput.addEventListener('change', () => {
    chrome.storage.local.set({ navUrl: navUrlInput.value })
  })

  // 收藏按钮
  saveBtn.addEventListener('click', async () => {
    const bookmark = {
      id: crypto.randomUUID(),
      title: titleInput.value,
      url: urlInput.value,
      description: descriptionInput.value,
      categoryId: categorySelect.value,
      favicon: tab.favIconUrl || '',
      createdAt: Date.now()
    }

    // 保存到本地存储
    const data = await chrome.storage.local.get(['bookmarks'])
    const bookmarks = data.bookmarks || []
    bookmarks.push(bookmark)
    await chrome.storage.local.set({ bookmarks })

    // 尝试发送到导航页
    try {
      const navUrl = navUrlInput.value || DEFAULT_NAV_URL
      // 通过 postMessage 发送到导航页（如果已打开）
      const tabs = await chrome.tabs.query({ url: navUrl + '/*' })
      if (tabs.length > 0) {
        await chrome.tabs.sendMessage(tabs[0].id, {
          type: 'ADD_BOOKMARK',
          payload: bookmark
        })
      }
    } catch (e) {
      console.log('导航页未打开，书签已保存到本地')
    }

    // 显示成功
    formView.classList.add('hidden')
    successView.classList.remove('hidden')
    
    setTimeout(() => window.close(), 1500)
  })

  // 同步浏览器书签
  syncBtn.addEventListener('click', async () => {
    try {
      const tree = await chrome.bookmarks.getTree()
      const bookmarks = []
      
      function traverse(nodes, parentName = '') {
        for (const node of nodes) {
          if (node.url) {
            bookmarks.push({
              id: crypto.randomUUID(),
              title: node.title,
              url: node.url,
              categoryId: 'default',
              createdAt: node.dateAdded || Date.now(),
              description: parentName ? `来自: ${parentName}` : ''
            })
          }
          if (node.children) {
            traverse(node.children, node.title || parentName)
          }
        }
      }
      
      traverse(tree)
      
      // 保存到本地
      const data = await chrome.storage.local.get(['bookmarks'])
      const existingUrls = new Set((data.bookmarks || []).map(b => b.url))
      const newBookmarks = bookmarks.filter(b => !existingUrls.has(b.url))
      
      await chrome.storage.local.set({ 
        bookmarks: [...(data.bookmarks || []), ...newBookmarks] 
      })

      alert(`同步完成！新增 ${newBookmarks.length} 个书签`)
    } catch (e) {
      alert('同步失败: ' + e.message)
    }
  })
})

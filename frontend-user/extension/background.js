// 监听来自 content script 的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_BOOKMARKS') {
    chrome.storage.local.get(['bookmarks', 'categories'], (data) => {
      sendResponse({
        bookmarks: data.bookmarks || [],
        categories: data.categories || []
      })
    })
    return true
  }
  
  if (message.type === 'SAVE_BOOKMARK') {
    chrome.storage.local.get(['bookmarks'], (data) => {
      const bookmarks = data.bookmarks || []
      bookmarks.push(message.payload)
      chrome.storage.local.set({ bookmarks }, () => {
        sendResponse({ success: true })
      })
    })
    return true
  }
})

// 右键菜单快速收藏
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'save-to-nav',
    title: '收藏到导航页',
    contexts: ['page', 'link']
  })
})

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'save-to-nav') {
    const url = info.linkUrl || info.pageUrl
    const title = info.linkUrl ? info.selectionText || url : tab.title
    
    const bookmark = {
      id: crypto.randomUUID(),
      title: title,
      url: url,
      categoryId: 'default',
      favicon: tab.favIconUrl || '',
      createdAt: Date.now()
    }
    
    const data = await chrome.storage.local.get(['bookmarks'])
    const bookmarks = data.bookmarks || []
    bookmarks.push(bookmark)
    await chrome.storage.local.set({ bookmarks })
    
    // 显示通知
    chrome.action.setBadgeText({ text: '✓', tabId: tab.id })
    chrome.action.setBadgeBackgroundColor({ color: '#10b981' })
    
    setTimeout(() => {
      chrome.action.setBadgeText({ text: '', tabId: tab.id })
    }, 2000)
  }
})

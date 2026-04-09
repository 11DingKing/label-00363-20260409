// Content script 用于与导航页通信
// 监听来自导航页的请求
window.addEventListener('message', async (event) => {
  if (event.source !== window) return
  
  if (event.data?.type === 'BROWSER_NAV_REQUEST_SYNC') {
    // 从扩展获取书签数据
    chrome.runtime.sendMessage({ type: 'GET_BOOKMARKS' }, (response) => {
      window.postMessage({
        type: 'BROWSER_NAV_SYNC',
        payload: response
      }, '*')
    })
  }
})

// 监听来自扩展的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'ADD_BOOKMARK') {
    window.postMessage({
      type: 'BROWSER_NAV_ADD_BOOKMARK',
      payload: message.payload
    }, '*')
    sendResponse({ success: true })
  }
  return true
})

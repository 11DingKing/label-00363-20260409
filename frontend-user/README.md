# 🌐 浏览器导航页 - 前端用户端

<div align="center">

**一个现代化的浏览器导航页，让你的书签管理更简单、更高效**

基于 Vite + React + UnoCSS 构建，支持书签同步、智能分类和快速收藏

[快速开始](#-快速开始) · [功能特性](#-功能特性) · [浏览器扩展](#-浏览器扩展) · [Docker 部署](#-docker-部署)

</div>

---

## ✨ 功能特性

### 核心功能
- 🔖 **书签管理** - 添加、编辑、删除书签，支持标题、网址、描述和图标
- 📁 **智能分类** - 自定义分类，支持图标和颜色，轻松组织你的书签
- 🔍 **快速搜索** - 实时搜索，按标题、网址、描述快速定位
- � **本地存储** - 数据安全保存在浏览器本地，无需服务器

### 浏览器扩展
- 🧩 **一键收藏** - 点击扩展图标快速收藏当前页面
- �️ **右键菜单** - 右键页面或链接，选择"收藏到导航页"
- 🔄 **书签同步** - 一键导入浏览器所有书签，自动去重
- 🎨 **自定义分类** - 在扩展中选择分类，收藏更有序

### 用户体验
- 🎨 **现代设计** - 渐变背景、圆角卡片、流畅动画
- 📱 **响应式布局** - 完美适配桌面和移动设备
- ⚡ **极速加载** - Vite 构建，秒开无等待
- 🌈 **视觉反馈** - 悬停效果、加载状态、成功提示

---

## 🚀 快速开始

### 方式一：Docker 部署（推荐）

在项目根目录执行：

```bash
# 构建并启动服务
docker-compose up --build -d

# 访问应用
# http://localhost:8081
```

### 方式二：本地开发

```bash
# 进入项目目录
cd frontend-user

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 **http://localhost:5173** 即可使用导航页

### 2️⃣ 生成扩展图标

浏览器扩展需要 PNG 格式的图标，我们提供了便捷的转换工具：

1. 在浏览器中打开 `extension/icons/convert-svg-to-png.html`
2. 点击"生成并下载 PNG 图标"按钮
3. 浏览器会自动下载 3 个 PNG 文件（16x16、48x48、128x128）
4. 将下载的文件放到 `extension/icons/` 目录

> 💡 **提示**：也可以使用 ImageMagick 等命令行工具转换

### 3️⃣ 安装浏览器扩展

1. 打开 Chrome 浏览器，访问 `chrome://extensions/`
2. 开启右上角的 **「开发者模式」**
3. 点击 **「加载已解压的扩展程序」**
4. 选择 `browser-nav/extension` 文件夹
5. ✅ 扩展安装完成！

---

## 🧩 浏览器扩展使用

### 快速收藏当前页面
1. 点击浏览器工具栏的扩展图标
2. 自动填充当前页面标题和网址
3. 选择分类，添加描述（可选）
4. 点击"收藏"按钮

### 右键菜单收藏
- 在任意页面右键，选择 **「收藏到导航页」**
- 在链接上右键，选择 **「收藏到导航页」** 收藏该链接

### 同步浏览器书签
1. 点击扩展图标
2. 点击 **「同步浏览器书签」** 按钮
3. 自动导入所有浏览器书签，智能去重

### 自定义导航页地址
- 在扩展弹窗底部可以设置导航页地址
- 默认为 `http://localhost:5173`
- 部署后可修改为你的域名

---

## 🛠️ 技术栈

| 技术 | 说明 |
|------|------|
| **Vite** | 下一代前端构建工具，极速开发体验 |
| **React 18** | 现代化 UI 框架，组件化开发 |
| **TypeScript** | 类型安全，提升代码质量 |
| **UnoCSS** | 原子化 CSS 引擎，按需生成样式 |
| **Lucide React** | 精美的图标库，1000+ 图标 |
| **Chrome Extension API** | Manifest V3，现代化扩展开发 |

---

## 📁 项目结构

```
browser-nav/
├── src/                          # 源代码
│   ├── components/               # React 组件
│   │   ├── BookmarkCard.tsx      # 书签卡片
│   │   ├── BookmarkGrid.tsx      # 书签网格
│   │   ├── BookmarkModal.tsx     # 书签编辑弹窗
│   │   ├── CategoryModal.tsx     # 分类编辑弹窗
│   │   ├── CategorySidebar.tsx   # 分类侧边栏
│   │   └── SearchBar.tsx         # 搜索栏
│   ├── hooks/                    # 自定义 Hooks
│   │   └── useBookmarks.ts       # 书签管理逻辑
│   ├── types/                    # TypeScript 类型定义
│   │   └── index.ts              # 类型声明
│   ├── App.tsx                   # 主应用组件
│   ├── main.tsx                  # 应用入口
│   └── index.css                 # 全局样式
├── extension/                    # 浏览器扩展
│   ├── icons/                    # 扩展图标
│   │   ├── icon.svg              # SVG 源文件
│   │   ├── icon16.png            # 16x16 图标
│   │   ├── icon48.png            # 48x48 图标
│   │   ├── icon128.png           # 128x128 图标
│   │   └── convert-svg-to-png.html  # 图标转换工具
│   ├── manifest.json             # 扩展配置文件
│   ├── popup.html                # 扩展弹窗页面
│   ├── popup.js                  # 扩展弹窗逻辑
│   ├── background.js             # 后台服务脚本
│   └── content.js                # 内容脚本
├── uno.config.ts                 # UnoCSS 配置
├── vite.config.ts                # Vite 配置
├── tsconfig.json                 # TypeScript 配置
└── package.json                  # 项目依赖
```

---

## 📝 开发指南

### 构建生产版本

```bash
npm run build
```

构建产物在 `dist/` 目录，可部署到任意静态服务器

### 代码检查

```bash
npm run lint
```

### 预览生产版本

```bash
npm run preview
```

---

## 🐳 Docker 部署

### Dockerfile 说明

项目使用多阶段构建，支持 ARM 和 X86 架构：

**构建阶段**：
- 基础镜像：`node:20-alpine`
- 安装依赖并构建前端代码
- 生成优化后的静态文件

**运行阶段**：
- 基础镜像：`nginx:alpine`
- 复制构建产物到 Nginx
- 配置 SPA 路由支持和静态资源缓存

### 本地构建测试

```bash
# 构建镜像
docker build -t browser-nav-frontend .

# 运行容器
docker run -d -p 8081:80 browser-nav-frontend

# 访问应用
# http://localhost:8081
```

### Nginx 配置

- 启用 gzip 压缩
- SPA 路由支持（所有路由指向 index.html）
- 静态资源缓存（1年）
- 安全头配置

---

## 🎯 使用场景

- 📚 **学习资源管理** - 收藏教程、文档、视频课程
- 💼 **工作效率提升** - 整理常用工具、项目文档
- 🎮 **娱乐内容收藏** - 保存喜欢的网站、游戏、视频
- 🔧 **开发工具集合** - 管理开发工具、API 文档、代码片段
- 🌐 **个人导航中心** - 打造专属的浏览器起始页

---

## 💡 常见问题

**Q: 数据存储在哪里？**  
A: 所有数据保存在浏览器的 localStorage 中，完全本地化，不会上传到服务器。

**Q: 可以在多个设备间同步吗？**  
A: 目前仅支持本地存储，如需多设备同步，可以考虑接入云存储服务。

**Q: 扩展支持哪些浏览器？**  
A: 支持所有基于 Chromium 的浏览器（Chrome、Edge、Brave 等）。

**Q: 如何备份数据？**  
A: 可以在浏览器开发者工具中导出 localStorage 数据，或添加导出功能。

---

## 📄 开源协议

MIT License

---

<div align="center">

**如果这个项目对你有帮助，欢迎 Star ⭐**

Made with ❤️ by [Your Name]

</div>

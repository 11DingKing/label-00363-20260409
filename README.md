# 🌐 浏览器导航页项目

一个现代化的浏览器导航页，支持书签管理、智能分类和浏览器扩展快速收藏。

## How to Run

### 使用 Docker Compose（推荐）

```bash
# 构建并启动所有服务
docker-compose up --build -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

### 本地开发

```bash
# 进入前端项目
cd frontend-user

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## Services

| 服务名称 | 访问地址 | 说明 |
|---------|---------|------|
| 前端用户端 | http://localhost:8081 | 浏览器导航页主应用 |

## 测试账号

本项目为纯前端应用，无需登录账号。所有数据保存在浏览器本地存储中。

## 题目内容

### 项目简介

基于 Vite + React + UnoCSS 构建的现代化浏览器导航页，提供以下核心功能：

- 🔖 **书签管理**：添加、编辑、删除书签，支持标题、网址、描述和图标
- 📁 **智能分类**：自定义分类，支持图标和颜色，轻松组织书签
- 🔍 **快速搜索**：实时搜索，按标题、网址、描述快速定位
- 🧩 **浏览器扩展**：一键收藏当前页面，右键菜单快速收藏
- 🔄 **书签同步**：一键导入浏览器所有书签，自动去重
- 💾 **本地存储**：数据安全保存在浏览器本地，无需服务器

### 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite
- **样式方案**：UnoCSS（原子化 CSS）
- **图标库**：Lucide React
- **浏览器扩展**：Chrome Extension Manifest V3
- **容器化**：Docker + Docker Compose
- **Web 服务器**：Nginx

### 项目结构

```
.
├── frontend-user/              # 前端用户端
│   ├── src/                    # 源代码
│   │   ├── components/         # React 组件
│   │   ├── hooks/              # 自定义 Hooks
│   │   ├── types/              # TypeScript 类型
│   │   ├── App.tsx             # 主应用
│   │   └── main.tsx            # 入口文件
│   ├── extension/              # 浏览器扩展
│   │   ├── manifest.json       # 扩展配置
│   │   ├── popup.html/js       # 扩展弹窗
│   │   ├── background.js       # 后台脚本
│   │   └── content.js          # 内容脚本
│   ├── Dockerfile              # Docker 构建文件
│   ├── nginx.conf              # Nginx 配置
│   ├── package.json            # 项目依赖
│   └── README.md               # 前端详细文档
├── docker-compose.yml          # Docker Compose 配置
├── .gitignore                  # Git 忽略文件
└── README.md                   # 项目总览（本文件）
```

### 功能特性

#### 1. 书签管理
- 添加书签：支持标题、网址、描述、分类
- 编辑书签：修改书签信息
- 删除书签：移除不需要的书签
- 自动获取网站图标

#### 2. 分类管理
- 预设分类：默认、工作、学习、娱乐、工具
- 自定义分类：添加、编辑、删除分类
- 图标和颜色：为每个分类设置独特的图标和颜色
- 分类筛选：按分类查看书签

#### 3. 搜索功能
- 实时搜索：输入即搜索
- 多字段匹配：搜索标题、网址、描述
- 高亮显示：搜索结果高亮

#### 4. 浏览器扩展
- 快速收藏：点击扩展图标收藏当前页面
- 右键菜单：右键页面或链接快速收藏
- 书签同步：一键导入浏览器所有书签
- 自定义分类：在扩展中选择分类

#### 5. 用户体验
- 响应式设计：完美适配桌面和移动设备
- 现代化 UI：渐变背景、圆角卡片、流畅动画
- 快速加载：Vite 构建，秒开无等待
- 视觉反馈：悬停效果、加载状态、成功提示

### 部署说明

#### Docker 部署

项目使用多阶段构建，支持 ARM 和 X86 架构：

1. **构建阶段**：使用 Node.js 20 Alpine 镜像编译前端代码
2. **运行阶段**：使用 Nginx Alpine 镜像提供静态文件服务

#### 端口映射

- 前端用户端：8081 → 容器内 80

#### 健康检查

Docker Compose 配置了健康检查，每 30 秒检查一次服务状态。

### 浏览器扩展安装

1. 生成扩展图标（详见 frontend-user/README.md）
2. 打开 Chrome 浏览器，访问 `chrome://extensions/`
3. 开启"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择 `frontend-user/extension` 文件夹

### 开发指南

详细的开发文档请查看：
- [前端开发文档](./frontend-user/README.md)

### 常见问题

**Q: 数据存储在哪里？**  
A: 所有数据保存在浏览器的 localStorage 中，完全本地化。

**Q: 可以在多个设备间同步吗？**  
A: 目前仅支持本地存储，如需多设备同步，可以考虑接入云存储服务。

**Q: 扩展支持哪些浏览器？**  
A: 支持所有基于 Chromium 的浏览器（Chrome、Edge、Brave 等）。

**Q: Docker 构建失败怎么办？**  
A: 确保 Docker 版本 >= 20.10，并检查网络连接。可以尝试使用国内镜像源。

### 许可证

MIT License

---

<div align="center">

**Made with ❤️**

</div>

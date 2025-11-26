[根目录](../../CLAUDE.md) > [apps](../) > **docs**

---

# Docs 文档站点

> VitePress 文档站点
> 最后更新：2025-11-26T20:56:42

## 变更记录 (Changelog)

### 2025-11-26
- 初始化模块文档

---

## 模块职责

Docs 是基于 VitePress 构建的文档站点，用于展示 Semi Design Pro 组件库的使用文档、API 参考和示例代码。VitePress 是一个专为技术文档优化的静态站点生成器。

## 入口与启动

### 配置文件
- **VitePress 配置**: `.vitepress/config.mts`
- **文档首页**: `index.md`

### 启动命令
```bash
# 开发模式
pnpm docs:dev

# 构建静态站点
pnpm docs:build

# 预览构建结果
pnpm docs:preview
```

### 开发服务器
- 默认端口：由 VitePress 自动分配（通常 5173）
- 热更新：支持（实时预览 Markdown 更改）

## 对外接口

### 当前状态
- **类型**: 静态文档站点
- **访问方式**: HTTP 服务器
- **构建产物**: `.vitepress/dist/`（静态 HTML/CSS/JS）

### 部署目标
- 可部署到任何静态托管服务（Vercel、Netlify、GitHub Pages 等）

## 关键依赖与配置

### 核心依赖
```json
{
  "vitepress": "2.0.0-alpha.13"
}
```

### VitePress 配置 (`.vitepress/config.mts`)

```typescript
{
  title: "SemiProComponents",        // 站点标题
  description: "A VitePress Site",   // 站点描述
  themeConfig: {
    nav: [...],                      // 顶部导航
    sidebar: [...],                  // 侧边栏
    socialLinks: [...]               // 社交链接
  }
}
```

#### 当前导航结构
- **顶部导航**:
  - Home → `/`
  - Examples → `/markdown-examples`
- **侧边栏**:
  - Markdown Examples
  - Runtime API Examples

## 数据模型

### 文档结构
```
apps/docs/
├── index.md                    # 首页
├── markdown-examples.md        # Markdown 示例
├── api-examples.md             # API 示例
└── .vitepress/
    ├── config.mts              # 站点配置
    └── cache/                  # 构建缓存
```

### 当前文档页面
1. **首页** (`index.md`)
2. **Markdown Examples** (`markdown-examples.md`)
3. **API Examples** (`api-examples.md`)

## 测试与质量

### 测试配置
- **状态**: 无测试配置（文档类项目）
- **验证方式**: 手动预览和检查链接

### 文档质量检查
- **Markdown 格式**: 由 Prettier 格式化
- **链接检查**: 建议使用 `markdown-link-check`
- **拼写检查**: 建议添加 `cspell`

### 构建验证
```bash
# 构建检查（确保无语法错误）
pnpm docs:build
```

## 常见问题 (FAQ)

### Q: 如何添加新的文档页面？
A:
1. 在 `apps/docs/` 下创建 `.md` 文件
2. 在 `.vitepress/config.mts` 的 `sidebar` 或 `nav` 中添加链接
3. 运行 `pnpm docs:dev` 预览

### Q: 如何在文档中嵌入 Vue 组件？
A: VitePress 原生支持在 Markdown 中使用 Vue 组件。创建 `.vitepress/components/` 目录，放置组件后直接在 Markdown 中引用。

### Q: 如何自定义主题？
A: 在 `.vitepress/theme/` 下创建 `index.ts`，扩展默认主题或完全自定义。

### Q: 如何配置代码高亮？
A: VitePress 默认使用 Shiki 进行代码高亮，支持多种语言和主题。在 `config.mts` 中配置 `markdown.theme`。

## 相关文件清单

### 文档内容
```
├── index.md                  # 首页
├── markdown-examples.md      # Markdown 示例
└── api-examples.md           # API 示例
```

### 配置
```
.vitepress/
├── config.mts               # VitePress 配置
└── cache/                   # 构建缓存（自动生成）
```

### 包管理
```
└── package.json             # 包配置
```

## 下一步建议

### 内容完善
1. **组件文档**:
   - 为 `pro-table` 组件编写使用文档
   - 添加 API 参考表格
   - 提供交互式示例

2. **指南页面**:
   - 快速开始指南
   - 安装说明
   - 最佳实践

3. **示例代码**:
   - 为每个组件添加代码示例
   - 提供 CodeSandbox/StackBlitz 在线演示链接

### 功能增强
1. **搜索功能**: 配置 Algolia DocSearch 或本地搜索
2. **多语言**: 添加中英文切换（如需要）
3. **主题定制**: 自定义颜色和样式以匹配 Semi Design
4. **自动生成**: 从组件 TypeScript 类型自动生成 API 文档

### 部署配置
1. **CI/CD**: 配置 GitHub Actions 自动部署
2. **域名**: 配置自定义域名
3. **SEO**: 优化 meta 标签和站点地图

---

**模块类型**: 文档站点
**构建工具**: VitePress 2.0.0-alpha.13
**内容格式**: Markdown + Vue
**部署方式**: 静态站点托管

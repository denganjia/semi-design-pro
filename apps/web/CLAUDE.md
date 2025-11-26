[根目录](../../CLAUDE.md) > [apps](../) > **web**

---

# Web 应用

> Vite + React 19 演示应用
> 最后更新：2025-11-26T20:56:42

## 变更记录 (Changelog)

### 2025-11-26
- 初始化模块文档

---

## 模块职责

Web 是一个基于 Vite 构建的 React 19 演示应用，用于展示和测试 Semi Design Pro 组件库。应用使用了最新的 React Compiler，支持自动优化。

## 入口与启动

### 入口文件
- **HTML 入口**: `index.html`
- **应用入口**: `src/main.tsx`
- **根组件**: `src/App.tsx`

### 启动命令
```bash
# 开发模式
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

### 开发服务器
- 默认端口：由 Vite 自动分配
- 热更新：支持（HMR）

## 对外接口

### 当前状态
- **类型**: 演示应用（非库）
- **暴露接口**: 无（仅作为应用运行）

## 关键依赖与配置

### 核心依赖
```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0"
}
```

### 开发工具
- **构建**: Vite 7.2.2
- **类型检查**: TypeScript 5.9.3
- **代码检查**: ESLint 9.39.1
- **编译器**: babel-plugin-react-compiler 1.0.0

### 配置文件

#### `vite.config.ts`
- 使用 `@vitejs/plugin-react`
- 启用 React Compiler 插件
- 默认配置（无特殊优化）

```typescript
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
})
```

#### `tsconfig.json`
- 继承自根级配置
- 包含 `tsconfig.app.json` (应用代码) 和 `tsconfig.node.json` (构建脚本)

#### `eslint.config.js`
- 使用 TypeScript ESLint
- React Hooks 插件
- React Refresh 插件

## 数据模型

### 当前状态
- 无数据库连接
- 无 API 调用
- 使用本地状态管理（React useState）

### 示例代码结构
```typescript
// src/App.tsx - 简单的计数器示例
function App() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>count is {count}</button>
}
```

## 测试与质量

### 测试配置
- **状态**: 未配置测试框架
- **建议**: 添加 Vitest 用于组件测试

### 代码质量工具
- **ESLint**: 配置完成
- **TypeScript**: 严格模式
- **格式化**: 通过根级 Prettier

### 运行检查
```bash
# 代码检查
pnpm lint

# 类型检查
pnpm build  # 会运行 tsc -b
```

## 常见问题 (FAQ)

### Q: 如何添加新的页面/路由？
A: 当前应用是单页面应用，未配置路由。如需添加路由，建议安装 `react-router-dom`。

### Q: 如何集成 Semi Design 组件？
A:
1. 安装 `@douyinfe/semi-ui`
2. 在组件中导入并使用
3. 确保导入对应的 CSS 样式

### Q: React Compiler 有什么好处？
A: React Compiler 会自动优化组件的性能，减少不必要的重渲染，无需手动使用 `useMemo` 和 `useCallback`。

### Q: 为什么使用 React 19？
A: React 19 是最新版本，提供了更好的性能和新特性（如 React Compiler 支持）。

## 相关文件清单

### 源代码
```
src/
├── main.tsx          # 应用入口
├── App.tsx           # 根组件
├── App.css           # 应用样式
├── index.css         # 全局样式
└── assets/
    └── react.svg     # React logo
```

### 配置文件
```
├── index.html            # HTML 模板
├── vite.config.ts        # Vite 配置
├── tsconfig.json         # TypeScript 主配置
├── tsconfig.app.json     # 应用代码 TS 配置
├── tsconfig.node.json    # 构建脚本 TS 配置
├── eslint.config.js      # ESLint 配置
└── package.json          # 包配置
```

### 静态资源
```
public/
└── vite.svg         # Vite logo
```

## 下一步建议

1. **添加路由**: 集成 React Router 支持多页面导航
2. **集成组件库**: 引入 Semi Design 和本地 pro-table 组件
3. **状态管理**: 如需要，添加 Zustand 或 Redux
4. **测试**: 配置 Vitest 和 React Testing Library
5. **样式方案**: 考虑使用 CSS Modules 或 Tailwind CSS

---

**模块类型**: 应用
**构建工具**: Vite 7.2.2
**框架版本**: React 19.2.0
**特殊特性**: React Compiler 启用

[根目录](../../CLAUDE.md) > [packages](../) > **pro-table**

---

# Pro Table 组件包

> Semi Design 高级表格组件
> 最后更新：2025-11-26T20:56:42

## 变更记录 (Changelog)

### 2025-11-26
- 初始化模块文档

---

## 模块职责

`@semi-pro/pro-table` 是基于 Semi Design Table 组件的高级封装，提供企业级表格功能，如数据请求、分页、筛选、排序等开箱即用的特性。

## 入口与启动

### 包信息
- **包名**: `@semi-pro/pro-table`
- **版本**: 0.1.0
- **类型**: ESM 模块
- **入口**: `dist/index.js`
- **类型定义**: `dist/index.d.ts`

### 开发命令
```bash
# 构建包
pnpm build

# 运行测试
pnpm test

# 代码检查
pnpm lint
```

### 构建配置
使用 `tsup` 进行打包：
- **入口**: `src/index.ts`
- **格式**: ESM
- **类型声明**: 自动生成
- **外部依赖**: react, react-dom, @douyinfe/semi-ui
- **源码映射**: 启用

## 对外接口

### 导出结构
```typescript
// dist/index.d.ts（预期）
export { ProTable } from './ProTable'
export type { ProTableProps } from './types'
```

### 使用方式
```typescript
import { ProTable } from '@semi-pro/pro-table'

function App() {
  return <ProTable {...props} />
}
```

### Peer Dependencies
```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "@douyinfe/semi-ui": "^2.68.0"
}
```

**重要**: 使用此包的项目必须自行安装上述依赖。

## 关键依赖与配置

### 内部依赖
```json
{
  "@semi-pro/core": "workspace:*"
}
```

### 构建工具
- **tsup**: 8.5.1（快速 TypeScript 打包）
- **TypeScript**: 继承根级配置

### tsup 配置 (`tsup.config.ts`)
```typescript
{
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],              // 支持双格式
  dts: true,                           // 生成类型定义
  external: ['react', 'react-dom', '@douyinfe/semi-ui'],
  clean: true,                         // 每次构建清理 dist
  sourcemap: true                      // 生成源码映射
}
```

### 代码质量
- **Biome**: 配置文件 `biome.json`（当前继承默认配置）
- **Oxlint**: 用于快速代码检查

## 数据模型

### 当前状态
- **源码目录**: `src/`（当前为空）
- **建议结构**:
```
src/
├── index.ts              # 主入口
├── ProTable.tsx          # 主组件
├── types.ts              # 类型定义
├── hooks/                # 自定义 Hooks
│   ├── useRequest.ts     # 数据请求
│   └── usePagination.ts  # 分页逻辑
└── utils/                # 工具函数
```

### 预期功能（待实现）
1. **数据请求**: 支持异步数据加载
2. **分页**: 集成分页组件
3. **筛选**: 列筛选功能
4. **排序**: 列排序功能
5. **工具栏**: 搜索、刷新、列设置等
6. **响应式**: 支持移动端适配

## 测试与质量

### 测试配置
- **框架**: Vitest（已在 package.json 中配置）
- **状态**: 未发现测试文件

### 建议测试策略
1. **单元测试**:
   - 测试各个 Hook 的逻辑
   - 测试工具函数

2. **组件测试**:
   - 使用 `@testing-library/react` 测试组件渲染
   - 测试用户交互（点击、输入等）

3. **集成测试**:
   - 测试完整的数据流（请求 → 渲染 → 分页）

### 运行测试
```bash
# 运行测试
pnpm test

# 监听模式
pnpm test --watch

# 覆盖率报告
pnpm test --coverage
```

## 常见问题 (FAQ)

### Q: 如何开始开发组件？
A:
1. 在 `src/` 下创建 `ProTable.tsx` 和 `index.ts`
2. 实现基础组件逻辑
3. 运行 `pnpm build` 构建
4. 在 `apps/web` 中导入测试

### Q: 如何确保与 Semi Design 的兼容性？
A:
- 遵循 Semi Design 的 API 设计风格
- 使用 Semi UI 的基础组件作为底层
- 保持主题和样式一致性

### Q: 为什么同时导出 ESM 和 CJS？
A: 为了兼容性。虽然项目是 ESM 优先，但某些工具（如测试框架）可能仍需要 CJS。

### Q: 如何处理样式？
A:
- 优先使用 Semi Design 的样式系统
- 如需自定义，使用 CSS Modules 或 inline styles
- 避免引入额外的样式库

## 相关文件清单

### 配置文件
```
├── package.json          # 包配置
├── tsconfig.json         # TypeScript 配置（如存在）
├── tsup.config.ts        # 打包配置
└── biome.json            # 代码检查配置
```

### 源码目录
```
src/
└── (待创建)
```

### 构建产物
```
dist/                     # 自动生成
├── index.js              # ESM 入口
├── index.cjs             # CJS 入口
├── index.d.ts            # 类型定义
└── *.map                 # Source maps
```

## 下一步建议

### 核心开发
1. **创建基础组件**:
   - 实现 `ProTable` 主组件
   - 定义 TypeScript 接口

2. **实现核心功能**:
   - 数据请求 Hook
   - 分页逻辑
   - 筛选和排序

3. **添加工具栏**:
   - 搜索框
   - 刷新按钮
   - 列设置（显示/隐藏列）

### 质量保障
1. **添加测试**:
   - 为每个 Hook 编写单元测试
   - 为组件编写快照测试

2. **编写文档**:
   - 在 `apps/docs` 中添加使用文档
   - 提供代码示例

3. **性能优化**:
   - 虚拟滚动（大数据量）
   - memo 优化重渲染

### 发布准备
1. 添加 README.md
2. 添加 CHANGELOG.md
3. 配置语义化版本
4. 准备发布到 npm（或私有 registry）

---

**模块类型**: 组件包
**打包工具**: tsup 8.5.1
**目标格式**: ESM + CJS
**开发状态**: 初始化阶段（源码待开发）

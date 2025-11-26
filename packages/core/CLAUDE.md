[根目录](../../CLAUDE.md) > [packages](../) > **core**

---

# Core 核心库

> 共享核心工具和类型定义
> 最后更新：2025-11-26T20:56:42

## 变更记录 (Changelog)

### 2025-11-26
- 初始化模块文档

---

## 模块职责

`@semi-pro/core` 是项目的核心共享库，提供所有包和应用通用的工具函数、类型定义、常量和基础设施代码。作为基础依赖，它被其他包（如 `pro-table`）引用。

## 入口与启动

### 包信息
- **包名**: `@semi-pro/core`
- **版本**: 0.0.1
- **类型**: ESM 模块
- **入口**: `dist/index.js`
- **类型定义**: `dist/index.d.ts`

### 开发命令
```bash
# 构建包
pnpm build

# 运行测试
pnpm test
```

### 构建配置
使用 `tsup` 进行打包（配置文件未显式提供，使用默认配置）：
- **入口**: 推测为 `src/index.ts`
- **格式**: ESM
- **类型声明**: 自动生成

## 对外接口

### 导出内容（预期）
```typescript
// 工具函数
export * from './utils'

// 类型定义
export * from './types'

// 常量
export * from './constants'

// Hooks（如有）
export * from './hooks'
```

### 使用方式
```typescript
// 在其他包中引用
import { someUtil, SomeType } from '@semi-pro/core'
```

### 依赖关系
- **被依赖方**: `@semi-pro/pro-table` 等其他包
- **外部依赖**: 无（纯工具库）

## 关键依赖与配置

### 内部依赖
- 无（作为最底层的核心库）

### 开发依赖
- **tsup**: 用于打包（继承根级配置）
- **vitest**: 用于测试

### tsup 配置
```typescript
// 推测的配置（tsup.config.ts 未找到，可能使用默认）
{
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true
}
```

### TypeScript 配置
- 继承自 `packages/typescript-config/base.json`
- 严格模式
- NodeNext 模块解析

## 数据模型

### 建议目录结构
```
src/
├── index.ts              # 主入口（导出所有内容）
├── types/                # 类型定义
│   ├── index.ts
│   ├── common.ts         # 通用类型
│   └── table.ts          # 表格相关类型
├── utils/                # 工具函数
│   ├── index.ts
│   ├── format.ts         # 格式化工具
│   ├── validation.ts     # 验证工具
│   └── request.ts        # 请求工具
├── constants/            # 常量定义
│   ├── index.ts
│   └── config.ts
└── hooks/                # 共享 Hooks（可选）
    ├── index.ts
    └── useDebounce.ts
```

### 预期功能模块

#### 1. 类型定义
```typescript
// types/common.ts
export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type Dict<T = any> = Record<string, T>
```

#### 2. 工具函数
```typescript
// utils/format.ts
export function formatDate(date: Date, format: string): string
export function formatNumber(num: number, decimals: number): string

// utils/validation.ts
export function isEmail(str: string): boolean
export function isPhone(str: string): boolean
```

#### 3. 常量
```typescript
// constants/config.ts
export const DEFAULT_PAGE_SIZE = 10
export const MAX_PAGE_SIZE = 100
```

#### 4. Hooks
```typescript
// hooks/useDebounce.ts
export function useDebounce<T>(value: T, delay: number): T
```

## 测试与质量

### 测试配置
- **框架**: Vitest
- **状态**: 已配置但未发现测试文件

### 建议测试策略

#### 1. 单元测试
为每个工具函数编写测试：
```typescript
// __tests__/utils/format.test.ts
import { formatDate } from '../utils/format'

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2025-11-26')
    expect(formatDate(date, 'YYYY-MM-DD')).toBe('2025-11-26')
  })
})
```

#### 2. 类型测试
使用 `tsd` 或类似工具测试类型推导：
```typescript
// __tests__/types/common.test-d.ts
import { expectType } from 'tsd'
import type { Nullable } from '../types/common'

expectType<Nullable<string>>('hello')
expectType<Nullable<string>>(null)
```

### 运行测试
```bash
# 运行所有测试
pnpm test

# 监听模式
pnpm test --watch

# 覆盖率
pnpm test --coverage
```

## 常见问题 (FAQ)

### Q: Core 包应该包含什么内容？
A:
- **应该**: 通用工具、类型定义、常量、共享逻辑
- **不应该**: 业务逻辑、UI 组件、特定领域代码

### Q: 如何在 Core 中添加新工具函数？
A:
1. 在 `src/utils/` 下创建或修改文件
2. 编写函数并导出
3. 在 `src/utils/index.ts` 中重新导出
4. 编写对应的单元测试
5. 运行 `pnpm build` 构建

### Q: 是否需要外部依赖？
A: 尽量避免。Core 包应该保持轻量，只在必要时引入依赖（如 `date-fns`、`lodash-es` 等）。如果引入，记得在 `package.json` 中添加。

### Q: 如何确保类型安全？
A:
- 使用 TypeScript 严格模式
- 为所有函数提供类型签名
- 使用泛型增强灵活性
- 编写类型测试

## 相关文件清单

### 配置文件
```
├── package.json          # 包配置
└── tsconfig.json         # TypeScript 配置（如存在）
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
├── index.d.ts            # 类型定义
└── *.map                 # Source maps
```

## 下一步建议

### 立即行动
1. **创建基础结构**:
   ```bash
   mkdir -p src/{types,utils,constants,hooks}
   touch src/index.ts
   touch src/{types,utils,constants,hooks}/index.ts
   ```

2. **实现核心工具**:
   - 日期格式化
   - 数字格式化
   - 防抖/节流 Hook
   - 通用类型定义

3. **编写测试**:
   - 为每个工具函数添加测试
   - 确保 100% 覆盖率

### 中期目标
1. **扩展功能**:
   - 请求工具（fetch 封装）
   - 本地存储工具
   - URL 参数处理

2. **文档完善**:
   - 为每个函数添加 JSDoc
   - 在 `apps/docs` 中添加 API 文档

3. **性能优化**:
   - Tree-shaking 优化
   - 减小包体积

### 长期规划
1. **发布到 npm**:
   - 添加 README
   - 添加使用示例
   - 配置语义化版本

2. **持续维护**:
   - 定期更新依赖
   - 修复 bug
   - 添加新功能

---

**模块类型**: 核心库
**打包工具**: tsup
**目标格式**: ESM
**外部依赖**: 无
**开发状态**: 初始化阶段（源码待开发）

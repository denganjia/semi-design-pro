[根目录](../../CLAUDE.md) > [packages](../) > **typescript-config**

---

# TypeScript Config

> 共享 TypeScript 配置
> 最后更新：2025-11-26T20:56:42

## 变更记录 (Changelog)

### 2025-11-26
- 初始化模块文档

---

## 模块职责

`@semi-pro/typescript-config` 提供项目中所有包和应用共享的 TypeScript 编译配置。通过集中管理配置，确保整个 monorepo 的类型检查规则和编译选项保持一致。

## 入口与启动

### 包信息
- **包名**: `@semi-pro/typescript-config`（推测）
- **类型**: 配置包
- **主要文件**: `base.json`

### 使用方式
在其他包的 `tsconfig.json` 中继承：
```json
{
  "extends": "@semi-pro/typescript-config/base.json",
  "compilerOptions": {
    // 包特定的覆盖配置
  }
}
```

## 对外接口

### 提供的配置文件
- **`base.json`**: 基础配置（当前唯一配置）

### 配置内容

#### `base.json` - 基础配置
```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "declaration": true,              // 生成 .d.ts 声明文件
    "declarationMap": true,           // 生成声明文件映射
    "esModuleInterop": true,          // ESM 互操作性
    "incremental": false,             // 禁用增量编译
    "isolatedModules": true,          // 独立模块（Vite/tsup 需要）
    "lib": ["es2022", "DOM", "DOM.Iterable"],
    "module": "NodeNext",             // 现代 Node.js 模块解析
    "moduleDetection": "force",       // 强制模块检测
    "moduleResolution": "NodeNext",   // Node.js 16+ 解析
    "noUncheckedIndexedAccess": true, // 索引访问安全检查
    "resolveJsonModule": true,        // 允许导入 JSON
    "skipLibCheck": true,             // 跳过库文件检查（加速）
    "strict": true,                   // 严格模式
    "target": "ES2022"                // 编译目标
  }
}
```

## 关键配置说明

### 严格模式 (`strict: true`)
启用所有严格类型检查选项：
- `strictNullChecks`: null/undefined 检查
- `strictFunctionTypes`: 函数类型严格检查
- `strictBindCallApply`: bind/call/apply 检查
- `strictPropertyInitialization`: 类属性初始化检查
- `noImplicitAny`: 禁止隐式 any
- `noImplicitThis`: 禁止隐式 this

### 模块系统
- **`module: "NodeNext"`**: 使用 Node.js 的现代模块系统
- **`moduleResolution: "NodeNext"`**: 支持 ESM 和 package.json `exports`
- **`moduleDetection: "force"`**: 强制将所有文件视为模块

### 类型安全增强
- **`noUncheckedIndexedAccess: true`**: 索引访问时自动添加 `undefined`
  ```typescript
  const arr = ['a', 'b']
  const item = arr[10]  // 类型为 string | undefined（而非 string）
  ```

### 性能优化
- **`skipLibCheck: true`**: 跳过第三方库的类型检查，加速编译
- **`incremental: false`**: 禁用增量编译（Turborepo 已有缓存机制）

### 兼容性
- **`isolatedModules: true`**: 每个文件独立编译（Vite/tsup 要求）
- **`esModuleInterop: true`**: 更好的 CommonJS 导入体验

## 数据模型

### 当前配置文件
```
packages/typescript-config/
└── base.json           # 基础配置
```

### 建议扩展配置
```
packages/typescript-config/
├── base.json           # 基础配置
├── react.json          # React 项目配置
├── library.json        # 库项目配置
└── node.json           # Node.js 项目配置
```

## 测试与质量

### 验证方式
```bash
# 在使用此配置的项目中运行
tsc --noEmit
```

### 配置测试
创建测试文件验证配置是否正确：
```typescript
// test.ts
const obj: Record<string, string> = {}
const value = obj['key']  // 应为 string | undefined
```

## 常见问题 (FAQ)

### Q: 为什么使用 `NodeNext` 而非 `ESNext`？
A: `NodeNext` 是 Node.js 16+ 的标准，完全支持 ESM、package.json `exports` 和条件导出，更符合现代 JavaScript 生态。

### Q: 为什么禁用增量编译？
A: Turborepo 已经提供了任务级别的缓存，TypeScript 的增量编译反而可能造成冲突。

### Q: 如何为特定包覆盖配置？
A:
```json
// packages/some-package/tsconfig.json
{
  "extends": "@semi-pro/typescript-config/base.json",
  "compilerOptions": {
    "jsx": "react-jsx",              // 添加 React JSX 支持
    "baseUrl": "./src"               // 设置基础路径
  }
}
```

### Q: `noUncheckedIndexedAccess` 会不会太严格？
A: 这是一个安全性增强选项，可能需要更多的类型断言，但能避免运行时错误。如果影响太大，可以在特定项目中禁用。

### Q: 为什么 `lib` 包含 `DOM`？
A: 许多工具库可能在浏览器和 Node.js 中通用，包含 DOM 类型可以提供更好的兼容性。纯 Node.js 项目可以覆盖此选项。

## 相关文件清单

```
packages/typescript-config/
└── base.json           # 基础 TypeScript 配置
```

## 下一步建议

### 配置扩展
1. **创建 `react.json`**:
   ```json
   {
     "extends": "./base.json",
     "compilerOptions": {
       "jsx": "react-jsx",
       "lib": ["es2022", "DOM", "DOM.Iterable"]
     }
   }
   ```

2. **创建 `library.json`**:
   ```json
   {
     "extends": "./base.json",
     "compilerOptions": {
       "declaration": true,
       "declarationMap": true,
       "rootDir": "./src",
       "outDir": "./dist"
     }
   }
   ```

3. **创建 `node.json`**（纯 Node.js 项目）:
   ```json
   {
     "extends": "./base.json",
     "compilerOptions": {
       "lib": ["es2022"],
       "types": ["node"]
     }
   }
   ```

### 文档完善
1. 在包中添加 `README.md`，说明每个配置的用途
2. 提供使用示例和最佳实践

### 工具集成
1. 添加 `package.json` 以便通过包名引用
2. 发布到 npm 或私有 registry（如需要）

---

**模块类型**: 配置包
**配置数量**: 1（base.json）
**TypeScript 版本**: 5.9.2
**严格模式**: 启用
**目标环境**: ES2022 + DOM

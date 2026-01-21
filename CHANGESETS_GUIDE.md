# Changesets 使用指南

## 什么是 Changesets？

Changesets 是一个用于管理 monorepo 版本和 changelog 的工具。它帮助你：
- 跟踪哪些包需要发布新版本
- 自动生成 CHANGELOG
- 自动更新依赖版本
- 发布包到 npm

## 工作流程

### 1. 开发新功能

```bash
# 创建功能分支
git checkout -b feature/pro-table-filter

# 开发功能...
# 编辑代码...
```

### 2. 添加 Changeset

当你完成一个功能或修复后，添加一个 changeset：

```bash
pnpm changeset
```

这会启动一个交互式命令行工具：

1. **选择变更的包**：使用空格键选择哪些包发生了变更
   - `@semi-pro/pro-table`
   - `@semi-pro/core`

2. **选择版本类型**：
   - `major` (1.0.0 → 2.0.0) - 破坏性变更
   - `minor` (1.0.0 → 1.1.0) - 新功能
   - `patch` (1.0.0 → 1.0.1) - Bug 修复

3. **描述变更**：输入变更描述，这会出现在 CHANGELOG 中

示例：
```
🦋  Which packages would you like to include?
› ◯ @semi-pro/core
  ◉ @semi-pro/pro-table

🦋  Which packages should have a major bump?
  ◯ @semi-pro/pro-table

🦋  Which packages should have a minor bump?
  ◉ @semi-pro/pro-table

🦋  Please enter a summary for this change:
添加列筛选功能
```

这会在 `.changeset/` 目录下创建一个文件，例如：
```
.changeset/
└── quick-dogs-smile.md
```

### 3. 提交 Changeset

```bash
git add .
git commit -m "feat(pro-table): add column filter feature"
git push origin feature/pro-table-filter
```

### 4. 合并到 develop/main

创建 PR 并合并后，changeset 文件会随代码一起合并。

### 5. 版本升级

当准备发布时，运行：

```bash
pnpm version
```

这会：
- 读取所有 changeset 文件
- 更新相关包的 `package.json` 版本号
- 更新内部依赖版本
- 生成/更新 CHANGELOG.md
- 删除已处理的 changeset 文件

### 6. 发布到 npm

```bash
pnpm release
```

这会：
- 构建所有包 (`pnpm build`)
- 发布到 npm (`changeset publish`)
- 创建 git tags

## 常用命令

| 命令 | 说明 |
|------|------|
| `pnpm changeset` | 添加新的 changeset |
| `pnpm changeset add` | 同上（别名） |
| `pnpm changeset status` | 查看待发布的变更 |
| `pnpm version` | 升级版本号并生成 changelog |
| `pnpm release` | 构建并发布到 npm |

## 示例场景

### 场景 1：修复 Bug

```bash
# 1. 修复 bug
vim packages/core/src/utils/format.ts

# 2. 添加 changeset
pnpm changeset
# 选择 @semi-pro/core
# 选择 patch
# 输入: "修复日期格式化错误"

# 3. 提交
git add .
git commit -m "fix(core): resolve date format issue"
```

### 场景 2：添加新功能

```bash
# 1. 开发新功能
vim packages/pro-table/src/ProTable.tsx

# 2. 添加 changeset
pnpm changeset
# 选择 @semi-pro/pro-table
# 选择 minor
# 输入: "新增虚拟滚动支持"

# 3. 提交
git add .
git commit -m "feat(pro-table): add virtual scrolling"
```

### 场景 3：破坏性变更

```bash
# 1. 重构 API
vim packages/core/src/types/common.ts

# 2. 添加 changeset
pnpm changeset
# 选择 @semi-pro/core
# 选择 major
# 输入: "重构类型定义，移除废弃的接口"

# 3. 提交
git add .
git commit -m "refactor(core)!: remove deprecated interfaces"
```

### 场景 4：多包同时变更

```bash
# 1. 修改多个包
vim packages/core/src/utils/request.ts
vim packages/pro-table/src/hooks/useRequest.ts

# 2. 添加 changeset
pnpm changeset
# 选择 @semi-pro/core 和 @semi-pro/pro-table
# core 选择 minor
# pro-table 选择 patch
# 输入: "优化请求错误处理"

# 3. 提交
git add .
git commit -m "feat(core,pro-table): improve error handling"
```

## 配置说明

### `.changeset/config.json`

```json
{
  "access": "public",  // npm 发布访问级别（public/restricted）
  "baseBranch": "main",  // 基准分支
  "updateInternalDependencies": "patch",  // 内部依赖更新策略
  "ignore": ["@semi-pro/typescript-config"],  // 忽略的包（不需要发版）
  "___experimentalUnsafeOptions_WILL_CHANGE_IN_PATCH": {
    "onlyUpdatePeerDependentsWhenOutOfRange": true  // 仅在超出范围时更新 peer 依赖
  }
}
```

### 关键配置项：

- **access**: 设置为 `public` 以便发布到公共 npm
- **ignore**: TypeScript 配置包无需单独发版
- **updateInternalDependencies**: 当内部依赖更新时，自动以 patch 版本更新依赖它的包

## GitHub Actions 自动发布

项目已配置自动发布工作流（`.github/workflows/release.yml`）。

### 工作流程：

1. **开发阶段**：
   - 开发者在 PR 中添加 changeset
   - 合并到 `main` 分支

2. **自动触发**：
   - GitHub Actions 检测到 main 分支有 changeset
   - 自动创建 "Version Packages" PR

3. **版本 PR**：
   - 包含所有版本更新
   - 包含 CHANGELOG 更新
   - Review 后合并

4. **自动发布**：
   - 合并后自动发布到 npm
   - 自动创建 git tags

### 需要的 Secrets：

在 GitHub 仓库设置中添加：

1. **GITHUB_TOKEN**：自动提供，无需手动配置
2. **NPM_TOKEN**：
   ```bash
   # 在 npm 网站生成 automation token
   # Settings → Access Tokens → Generate New Token → Automation

   # 在 GitHub 仓库中添加
   # Settings → Secrets and variables → Actions → New repository secret
   # Name: NPM_TOKEN
   # Value: 你的 npm token
   ```

## 最佳实践

### 1. Changeset 描述规范

✅ **好的描述**：
```
添加列筛选功能，支持多选和搜索
修复表格分页在特定条件下的计算错误
优化大数据量渲染性能，使用虚拟滚动
```

❌ **不好的描述**：
```
update
fix bug
changes
```

### 2. 何时添加 Changeset

- ✅ 每个功能 PR 都应该包含 changeset
- ✅ Bug 修复应该添加 changeset
- ✅ 文档更新如果影响 API，需要 changeset
- ❌ 内部重构如果不影响 API，可以不加
- ❌ 测试更新通常不需要 changeset

### 3. 版本选择指南

| 变更类型 | 版本 | 示例 |
|---------|------|------|
| 新增功能，向后兼容 | minor | 添加新的 prop，新的导出函数 |
| Bug 修复，向后兼容 | patch | 修复计算错误，样式问题 |
| 破坏性变更 | major | 删除 API，改变函数签名 |
| 文档更新 | patch | 更新 README，JSDoc |
| 性能优化（无 API 变化） | patch | 优化算法，减少重渲染 |

### 4. 多包依赖处理

当你修改 `core` 包时，依赖它的 `pro-table` 会自动以 `patch` 版本更新（由 `updateInternalDependencies` 配置决定）。

## 故障排除

### 问题 1：changeset 命令找不到

```bash
# 确保在根目录运行
cd D:\learn\semi-design-pro
pnpm changeset
```

### 问题 2：发布失败 - 未登录 npm

```bash
# 登录 npm
npm login

# 或使用 automation token
echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc
```

### 问题 3：版本冲突

```bash
# 查看当前状态
pnpm changeset status

# 手动解决冲突后重新运行
pnpm version
```

### 问题 4：忘记添加 changeset

```bash
# 可以在合并后追加
pnpm changeset
git add .
git commit -m "chore: add missing changeset"
```

## 相关资源

- [Changesets 官方文档](https://github.com/changesets/changesets)
- [语义化版本规范](https://semver.org/lang/zh-CN/)
- [Keep a Changelog](https://keepachangelog.com/zh-CN/)

## 快速参考

```bash
# 常用命令
pnpm changeset              # 添加变更集
pnpm changeset status       # 查看状态
pnpm version                # 升级版本
pnpm release                # 发布到 npm

# 查看帮助
pnpm changeset --help
```

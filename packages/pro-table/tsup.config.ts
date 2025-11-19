import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],          // 入口
  format: ['esm', 'cjs'],           // 同时出两种格式
  dts: true,                        // 自动生成 .d.ts
  external: ['react', 'react-dom', '@douyinfe/semi-ui'], // 不打进去的依赖
  clean: true,                      // 每次 build 先删 dist
  sourcemap: true,                  // 调试需要
})
import { defineConfig } from "vite";
import {compression} from "vite-plugin-compression2"
import { defer, delay } from "lodash-es";
import { resolve } from "path";
import { readFile } from "fs";

import shell from 'shelljs';
import vue from "@vitejs/plugin-vue";
import {hooksPlugin as hooks} from "@oxo-ui/vite-plugins"
import terser from "@rollup/plugin-terser";

const TRY_MOVE_STYLES_DELAY=800 as const

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

function moveStyles() {
  readFile("./dist/umd/index.css.gz", (err) => {
    if (err) return delay(moveStyles, TRY_MOVE_STYLES_DELAY);
    defer(() => shell.cp("./dist/umd/index.css", "./dist/index.css"));
  });
}

// 定义Vite配置
export default defineConfig({
  plugins: [
    vue(),
    compression({
      include: /.(cjs|css)$/i,
    }),
    terser({
      compress: {
        drop_console: ["log"],
        drop_debugger: true,
        passes: 3,
        global_defs: {
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          "@TEST": JSON.stringify(isTest),
        },
      },
    }),
    hooks({
      rmFiles:['./dist/umd','./dist/index.css'],
      afterBuild: moveStyles,
    })
  ],
  build: {
    // 构建输出目录
    outDir: 'dist/umd',
    // 定义库配置
    lib: {
      // 入口文件路径
      entry: resolve(__dirname, '../index.ts'),
      // 库名称
      name: 'OxoUI',
      // 输出文件名
      fileName: 'index',
      // 支持的格式
      formats: ['umd']
    },
    rollupOptions: {
      // 外部依赖列表
      external: ['vue'],
      output: {
        // 导出类型
        exports: 'named',
        // 全球变量映射
        globals: {
          vue: 'Vue'
        },
        // 资源文件命名规则
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'index.css';
          return assetInfo.name as string;
        }
      }
    }
  }
})
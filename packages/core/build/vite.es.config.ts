import { defineConfig } from "vite";
import { readdir, readdirSync } from "fs";
import { resolve } from "path";
import { defer, delay, filter, map } from "lodash-es";
import { visualizer } from "rollup-plugin-visualizer";

import dts from 'vite-plugin-dts';
import shell from 'shelljs';
import vue from "@vitejs/plugin-vue";
import {hooksPlugin as hooks} from "@oxo-ui/vite-plugins"
import terser from '@rollup/plugin-terser';

const TRY_MOVE_STYLES_DELAY=800 as const
const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

function moveStyles() {
  readdir("./dist/es/theme", (err) => {
    if (err) return delay(moveStyles, TRY_MOVE_STYLES_DELAY);
    defer(() => shell.mv("./dist/es/theme", "./dist"));
  });
}


function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true });

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}
// 定义Vite配置
export default defineConfig({
  // 应用插件，这里只应用了vue插件
  plugins: [
    vue(), 
    visualizer({
      filename: "dist/stats.es.html",
    }),
    dts({
    tsconfigPath: '../../tsconfig.build.json',
    outDir: "dist/types"
    }),
    hooks({
      rmFiles:['./dist/es','./dist/theme','./dist/types'],
      afterBuild: moveStyles,
    }),
    terser({
      compress: {
        sequences: isProd,
        arguments: isProd,
        drop_console: isProd && ["log"],
        drop_debugger: isProd,
        passes: isProd ? 4 : 1,
        global_defs: {
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          "@TEST": JSON.stringify(isTest),
        },
      },
      format: {
        semicolons: false,
        shorthand: isProd,
        braces: !isProd,
        beautify: !isProd,
        comments: !isProd,
      },
      mangle: {
        toplevel: isProd,
        eval: isProd,
        keep_classnames: isDev,
        keep_fnames: isDev,
      },
    }),
  ],
  build: {
    // 构建输出目录
    outDir: 'dist/es',
    minify: false,
    cssCodeSplit: true,
    // 定义库配置
    lib: {
      // 入口文件路径
      entry: resolve(__dirname, '../index.ts'),
      // 库名称
      name: 'ToyElement',
      // 输出文件名
      fileName: 'index',
      // 支持的格式
      formats: ['es']
    },
    rollupOptions: {
      // 外部依赖列表
      external: [
        'vue',
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator",
      ],
      output: {
        // 资源文件命名规则
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'index.css';
          if (
            assetInfo.type === 'asset' &&
            /\.(css)$/i.test(assetInfo.name as string)
          ){
            return "theme/[name].[ext]";
          }
          return assetInfo.name as string;
        },
        // 根据传入的id进行相应的处理逻辑
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("/packages/hooks")) {
            return "hooks";
          }
          if (
            id.includes("/packages/utils")||
            id.includes('plugin-vue:export-helper')
          ) {
            return "utils";
          }
          for (const item of getDirectoriesSync("../components")) {
            if (id.includes(`/packages/components/${item}`)) {
              return item;
            }
          }
          console.log(id);
        }
      }
    }
  }
})
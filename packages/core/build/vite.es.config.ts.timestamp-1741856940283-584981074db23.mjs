// build/vite.es.config.ts
import { defineConfig } from "file:///D:/HuaweiMoveData/Users/86186/Desktop/code/0xo-ui/node_modules/.pnpm/vite@5.4.14_@types+node@20.17.24_sass@1.85.1_terser@5.39.0/node_modules/vite/dist/node/index.js";
import { readdir, readdirSync } from "fs";
import { resolve } from "path";
import { defer, delay, filter, map } from "file:///D:/HuaweiMoveData/Users/86186/Desktop/code/0xo-ui/node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/lodash.js";
import { visualizer } from "file:///D:/HuaweiMoveData/Users/86186/Desktop/code/0xo-ui/node_modules/.pnpm/rollup-plugin-visualizer@5.14.0_rollup@4.35.0/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import dts from "file:///D:/HuaweiMoveData/Users/86186/Desktop/code/0xo-ui/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.17.24_rollup@4.35.0_typescript@5.8.2_vite@5.4.14_@types+_7kjc2jba23z7mqpxyh5vdmdbbi/node_modules/vite-plugin-dts/dist/index.mjs";
import shell from "file:///D:/HuaweiMoveData/Users/86186/Desktop/code/0xo-ui/node_modules/.pnpm/shelljs@0.8.5/node_modules/shelljs/shell.js";
import vue from "file:///D:/HuaweiMoveData/Users/86186/Desktop/code/0xo-ui/node_modules/.pnpm/@vitejs+plugin-vue@5.2.1_vite@5.4.14_@types+node@20.17.24_sass@1.85.1_terser@5.39.0__vue@3.5.13_typescript@5.8.2_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { hooksPlugin as hooks } from "file:///D:/HuaweiMoveData/Users/86186/Desktop/code/0xo-ui/libs/vite-plugins/.dist/index.js";
import terser from "file:///D:/HuaweiMoveData/Users/86186/Desktop/code/0xo-ui/node_modules/.pnpm/@rollup+plugin-terser@0.4.4_rollup@4.35.0/node_modules/@rollup/plugin-terser/dist/es/index.js";
var __vite_injected_original_dirname = "D:\\HuaweiMoveData\\Users\\86186\\Desktop\\code\\0xo-ui\\packages\\core\\build";
var TRY_MOVE_STYLES_DELAY = 800;
var isProd = process.env.NODE_ENV === "production";
var isDev = process.env.NODE_ENV === "development";
var isTest = process.env.NODE_ENV === "test";
function moveStyles() {
  readdir("./dist/es/theme", (err) => {
    if (err) return delay(moveStyles, TRY_MOVE_STYLES_DELAY);
    defer(() => shell.mv("./dist/es/theme", "./dist"));
  });
}
function getDirectoriesSync(basePath) {
  const entries = readdirSync(basePath, { withFileTypes: true });
  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}
var vite_es_config_default = defineConfig({
  // 应用插件，这里只应用了vue插件
  plugins: [
    vue(),
    visualizer({
      filename: "dist/stats.es.html"
    }),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types"
    }),
    hooks({
      rmFiles: ["./dist/es", "./dist/theme", "./dist/types"],
      afterBuild: moveStyles
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
          "@TEST": JSON.stringify(isTest)
        }
      },
      format: {
        semicolons: false,
        shorthand: isProd,
        braces: !isProd,
        beautify: !isProd,
        comments: !isProd
      },
      mangle: {
        toplevel: isProd,
        eval: isProd,
        keep_classnames: isDev,
        keep_fnames: isDev
      }
    })
  ],
  build: {
    // 构建输出目录
    outDir: "dist/es",
    minify: false,
    cssCodeSplit: true,
    // 定义库配置
    lib: {
      // 入口文件路径
      entry: resolve(__vite_injected_original_dirname, "../index.ts"),
      // 库名称
      name: "ToyElement",
      // 输出文件名
      fileName: "index",
      // 支持的格式
      formats: ["es"]
    },
    rollupOptions: {
      // 外部依赖列表
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator"
      ],
      output: {
        // 资源文件命名规则
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css";
          if (assetInfo.type === "asset" && /\.(css)$/i.test(assetInfo.name)) {
            return "theme/[name].[ext]";
          }
          return assetInfo.name;
        },
        // 根据传入的id进行相应的处理逻辑
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("/packages/hooks")) {
            return "hooks";
          }
          if (id.includes("/packages/utils") || id.includes("plugin-vue:export-helper")) {
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
});
export {
  vite_es_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYnVpbGQvdml0ZS5lcy5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxIdWF3ZWlNb3ZlRGF0YVxcXFxVc2Vyc1xcXFw4NjE4NlxcXFxEZXNrdG9wXFxcXGNvZGVcXFxcMHhvLXVpXFxcXHBhY2thZ2VzXFxcXGNvcmVcXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXEh1YXdlaU1vdmVEYXRhXFxcXFVzZXJzXFxcXDg2MTg2XFxcXERlc2t0b3BcXFxcY29kZVxcXFwweG8tdWlcXFxccGFja2FnZXNcXFxcY29yZVxcXFxidWlsZFxcXFx2aXRlLmVzLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovSHVhd2VpTW92ZURhdGEvVXNlcnMvODYxODYvRGVza3RvcC9jb2RlLzB4by11aS9wYWNrYWdlcy9jb3JlL2J1aWxkL3ZpdGUuZXMuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHsgcmVhZGRpciwgcmVhZGRpclN5bmMgfSBmcm9tIFwiZnNcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IGRlZmVyLCBkZWxheSwgZmlsdGVyLCBtYXAgfSBmcm9tIFwibG9kYXNoLWVzXCI7XHJcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tIFwicm9sbHVwLXBsdWdpbi12aXN1YWxpemVyXCI7XHJcblxyXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cyc7XHJcbmltcG9ydCBzaGVsbCBmcm9tICdzaGVsbGpzJztcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbmltcG9ydCB7aG9va3NQbHVnaW4gYXMgaG9va3N9IGZyb20gXCJAb3hvLXVpL3ZpdGUtcGx1Z2luc1wiXHJcbmltcG9ydCB0ZXJzZXIgZnJvbSAnQHJvbGx1cC9wbHVnaW4tdGVyc2VyJztcclxuXHJcbmNvbnN0IFRSWV9NT1ZFX1NUWUxFU19ERUxBWT04MDAgYXMgY29uc3RcclxuY29uc3QgaXNQcm9kID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiO1xyXG5jb25zdCBpc0RldiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcImRldmVsb3BtZW50XCI7XHJcbmNvbnN0IGlzVGVzdCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInRlc3RcIjtcclxuXHJcbmZ1bmN0aW9uIG1vdmVTdHlsZXMoKSB7XHJcbiAgcmVhZGRpcihcIi4vZGlzdC9lcy90aGVtZVwiLCAoZXJyKSA9PiB7XHJcbiAgICBpZiAoZXJyKSByZXR1cm4gZGVsYXkobW92ZVN0eWxlcywgVFJZX01PVkVfU1RZTEVTX0RFTEFZKTtcclxuICAgIGRlZmVyKCgpID0+IHNoZWxsLm12KFwiLi9kaXN0L2VzL3RoZW1lXCIsIFwiLi9kaXN0XCIpKTtcclxuICB9KTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGdldERpcmVjdG9yaWVzU3luYyhiYXNlUGF0aDogc3RyaW5nKSB7XHJcbiAgY29uc3QgZW50cmllcyA9IHJlYWRkaXJTeW5jKGJhc2VQYXRoLCB7IHdpdGhGaWxlVHlwZXM6IHRydWUgfSk7XHJcblxyXG4gIHJldHVybiBtYXAoXHJcbiAgICBmaWx0ZXIoZW50cmllcywgKGVudHJ5KSA9PiBlbnRyeS5pc0RpcmVjdG9yeSgpKSxcclxuICAgIChlbnRyeSkgPT4gZW50cnkubmFtZVxyXG4gICk7XHJcbn1cclxuLy8gXHU1QjlBXHU0RTQ5Vml0ZVx1OTE0RFx1N0Y2RVxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIC8vIFx1NUU5NFx1NzUyOFx1NjNEMlx1NEVGNlx1RkYwQ1x1OEZEOVx1OTFDQ1x1NTNFQVx1NUU5NFx1NzUyOFx1NEU4NnZ1ZVx1NjNEMlx1NEVGNlxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSgpLCBcclxuICAgIHZpc3VhbGl6ZXIoe1xyXG4gICAgICBmaWxlbmFtZTogXCJkaXN0L3N0YXRzLmVzLmh0bWxcIixcclxuICAgIH0pLFxyXG4gICAgZHRzKHtcclxuICAgIHRzY29uZmlnUGF0aDogJy4uLy4uL3RzY29uZmlnLmJ1aWxkLmpzb24nLFxyXG4gICAgb3V0RGlyOiBcImRpc3QvdHlwZXNcIlxyXG4gICAgfSksXHJcbiAgICBob29rcyh7XHJcbiAgICAgIHJtRmlsZXM6WycuL2Rpc3QvZXMnLCcuL2Rpc3QvdGhlbWUnLCcuL2Rpc3QvdHlwZXMnXSxcclxuICAgICAgYWZ0ZXJCdWlsZDogbW92ZVN0eWxlcyxcclxuICAgIH0pLFxyXG4gICAgdGVyc2VyKHtcclxuICAgICAgY29tcHJlc3M6IHtcclxuICAgICAgICBzZXF1ZW5jZXM6IGlzUHJvZCxcclxuICAgICAgICBhcmd1bWVudHM6IGlzUHJvZCxcclxuICAgICAgICBkcm9wX2NvbnNvbGU6IGlzUHJvZCAmJiBbXCJsb2dcIl0sXHJcbiAgICAgICAgZHJvcF9kZWJ1Z2dlcjogaXNQcm9kLFxyXG4gICAgICAgIHBhc3NlczogaXNQcm9kID8gNCA6IDEsXHJcbiAgICAgICAgZ2xvYmFsX2RlZnM6IHtcclxuICAgICAgICAgIFwiQERFVlwiOiBKU09OLnN0cmluZ2lmeShpc0RldiksXHJcbiAgICAgICAgICBcIkBQUk9EXCI6IEpTT04uc3RyaW5naWZ5KGlzUHJvZCksXHJcbiAgICAgICAgICBcIkBURVNUXCI6IEpTT04uc3RyaW5naWZ5KGlzVGVzdCksXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgZm9ybWF0OiB7XHJcbiAgICAgICAgc2VtaWNvbG9uczogZmFsc2UsXHJcbiAgICAgICAgc2hvcnRoYW5kOiBpc1Byb2QsXHJcbiAgICAgICAgYnJhY2VzOiAhaXNQcm9kLFxyXG4gICAgICAgIGJlYXV0aWZ5OiAhaXNQcm9kLFxyXG4gICAgICAgIGNvbW1lbnRzOiAhaXNQcm9kLFxyXG4gICAgICB9LFxyXG4gICAgICBtYW5nbGU6IHtcclxuICAgICAgICB0b3BsZXZlbDogaXNQcm9kLFxyXG4gICAgICAgIGV2YWw6IGlzUHJvZCxcclxuICAgICAgICBrZWVwX2NsYXNzbmFtZXM6IGlzRGV2LFxyXG4gICAgICAgIGtlZXBfZm5hbWVzOiBpc0RldixcclxuICAgICAgfSxcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIC8vIFx1Njc4NFx1NUVGQVx1OEY5M1x1NTFGQVx1NzZFRVx1NUY1NVxyXG4gICAgb3V0RGlyOiAnZGlzdC9lcycsXHJcbiAgICBtaW5pZnk6IGZhbHNlLFxyXG4gICAgY3NzQ29kZVNwbGl0OiB0cnVlLFxyXG4gICAgLy8gXHU1QjlBXHU0RTQ5XHU1RTkzXHU5MTREXHU3RjZFXHJcbiAgICBsaWI6IHtcclxuICAgICAgLy8gXHU1MTY1XHU1M0UzXHU2NTg3XHU0RUY2XHU4REVGXHU1Rjg0XHJcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgJy4uL2luZGV4LnRzJyksXHJcbiAgICAgIC8vIFx1NUU5M1x1NTQwRFx1NzlGMFxyXG4gICAgICBuYW1lOiAnVG95RWxlbWVudCcsXHJcbiAgICAgIC8vIFx1OEY5M1x1NTFGQVx1NjU4N1x1NEVGNlx1NTQwRFxyXG4gICAgICBmaWxlTmFtZTogJ2luZGV4JyxcclxuICAgICAgLy8gXHU2NTJGXHU2MzAxXHU3Njg0XHU2ODNDXHU1RjBGXHJcbiAgICAgIGZvcm1hdHM6IFsnZXMnXVxyXG4gICAgfSxcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgLy8gXHU1OTE2XHU5MEU4XHU0RjlEXHU4RDU2XHU1MjE3XHU4ODY4XHJcbiAgICAgIGV4dGVybmFsOiBbXHJcbiAgICAgICAgJ3Z1ZScsXHJcbiAgICAgICAgXCJAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmVcIixcclxuICAgICAgICBcIkBmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29uc1wiLFxyXG4gICAgICAgIFwiQGZvcnRhd2Vzb21lL3Z1ZS1mb250YXdlc29tZVwiLFxyXG4gICAgICAgIFwiQHBvcHBlcmpzL2NvcmVcIixcclxuICAgICAgICBcImFzeW5jLXZhbGlkYXRvclwiLFxyXG4gICAgICBdLFxyXG4gICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAvLyBcdThENDRcdTZFOTBcdTY1ODdcdTRFRjZcdTU0N0RcdTU0MERcdTg5QzRcdTUyMTlcclxuICAgICAgICBhc3NldEZpbGVOYW1lczogKGFzc2V0SW5mbykgPT4ge1xyXG4gICAgICAgICAgaWYgKGFzc2V0SW5mby5uYW1lID09PSAnc3R5bGUuY3NzJykgcmV0dXJuICdpbmRleC5jc3MnO1xyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBhc3NldEluZm8udHlwZSA9PT0gJ2Fzc2V0JyAmJlxyXG4gICAgICAgICAgICAvXFwuKGNzcykkL2kudGVzdChhc3NldEluZm8ubmFtZSBhcyBzdHJpbmcpXHJcbiAgICAgICAgICApe1xyXG4gICAgICAgICAgICByZXR1cm4gXCJ0aGVtZS9bbmFtZV0uW2V4dF1cIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBhc3NldEluZm8ubmFtZSBhcyBzdHJpbmc7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyBcdTY4MzlcdTYzNkVcdTRGMjBcdTUxNjVcdTc2ODRpZFx1OEZEQlx1ODg0Q1x1NzZGOFx1NUU5NFx1NzY4NFx1NTkwNFx1NzQwNlx1OTAzQlx1OEY5MVxyXG4gICAgICAgIG1hbnVhbENodW5rcyhpZCkge1xyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwibm9kZV9tb2R1bGVzXCIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcInZlbmRvclwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiL3BhY2thZ2VzL2hvb2tzXCIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcImhvb2tzXCI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIGlkLmluY2x1ZGVzKFwiL3BhY2thZ2VzL3V0aWxzXCIpfHxcclxuICAgICAgICAgICAgaWQuaW5jbHVkZXMoJ3BsdWdpbi12dWU6ZXhwb3J0LWhlbHBlcicpXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwidXRpbHNcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBnZXREaXJlY3Rvcmllc1N5bmMoXCIuLi9jb21wb25lbnRzXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhgL3BhY2thZ2VzL2NvbXBvbmVudHMvJHtpdGVtfWApKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbnNvbGUubG9nKGlkKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyWixTQUFTLG9CQUFvQjtBQUN4YixTQUFTLFNBQVMsbUJBQW1CO0FBQ3JDLFNBQVMsZUFBZTtBQUN4QixTQUFTLE9BQU8sT0FBTyxRQUFRLFdBQVc7QUFDMUMsU0FBUyxrQkFBa0I7QUFFM0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sV0FBVztBQUNsQixPQUFPLFNBQVM7QUFDaEIsU0FBUSxlQUFlLGFBQVk7QUFDbkMsT0FBTyxZQUFZO0FBVm5CLElBQU0sbUNBQW1DO0FBWXpDLElBQU0sd0JBQXNCO0FBQzVCLElBQU0sU0FBUyxRQUFRLElBQUksYUFBYTtBQUN4QyxJQUFNLFFBQVEsUUFBUSxJQUFJLGFBQWE7QUFDdkMsSUFBTSxTQUFTLFFBQVEsSUFBSSxhQUFhO0FBRXhDLFNBQVMsYUFBYTtBQUNwQixVQUFRLG1CQUFtQixDQUFDLFFBQVE7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

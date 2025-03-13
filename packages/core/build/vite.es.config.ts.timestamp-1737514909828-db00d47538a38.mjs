// build/vite.es.config.ts
import { defineConfig } from "file:///D:/HuaweiMoveData/Users/86186/Desktop/code/oxo-ui/node_modules/.pnpm/vite@5.2.11_@types+node@20.12.11_sass@1.83.0_terser@5.31.0/node_modules/vite/dist/node/index.js";
import { readdir, readdirSync } from "fs";
import { resolve } from "path";
import { defer, delay, filter, map } from "file:///D:/HuaweiMoveData/Users/86186/Desktop/code/oxo-ui/node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/lodash.js";
import { visualizer } from "file:///D:/HuaweiMoveData/Users/86186/Desktop/code/oxo-ui/node_modules/.pnpm/rollup-plugin-visualizer@5.13.1_rollup@4.17.2/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import dts from "file:///D:/HuaweiMoveData/Users/86186/Desktop/code/oxo-ui/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.12.11_rollup@4.17.2_typescript@5.7.2_vite@5.2.11_@types+_ptkn27dehddgrp3ry5x5xgytz4/node_modules/vite-plugin-dts/dist/index.mjs";
import shell from "file:///D:/HuaweiMoveData/Users/86186/Desktop/code/oxo-ui/node_modules/.pnpm/shelljs@0.8.5/node_modules/shelljs/shell.js";
import vue from "file:///D:/HuaweiMoveData/Users/86186/Desktop/code/oxo-ui/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.2.11_@types+node@20.12.11_sass@1.83.0_terser@5.31.0__vue@3.4.27_typescript@5.4.5_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { hooksPlugin as hooks } from "file:///D:/HuaweiMoveData/Users/86186/Desktop/code/oxo-ui/libs/vite-plugins/.dist/index.js";
import terser from "file:///D:/HuaweiMoveData/Users/86186/Desktop/code/oxo-ui/node_modules/.pnpm/@rollup+plugin-terser@0.4.4_rollup@4.17.2/node_modules/@rollup/plugin-terser/dist/es/index.js";
var __vite_injected_original_dirname = "D:\\HuaweiMoveData\\Users\\86186\\Desktop\\code\\oxo-ui\\packages\\core\\build";
var TRY_MOVE_STYLES_DELAY = 800;
var isProd = process.env.NODE_ENV === "production";
var isDev = process.env.NODE_ENV === "development";
var isTest = process.env.NODE_ENV === "test";
function moveStyles() {
  readdir("./dist/es/theme", (err) => {
    if (err)
      return delay(moveStyles, TRY_MOVE_STYLES_DELAY);
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
          if (assetInfo.name === "style.css")
            return "index.css";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYnVpbGQvdml0ZS5lcy5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxIdWF3ZWlNb3ZlRGF0YVxcXFxVc2Vyc1xcXFw4NjE4NlxcXFxEZXNrdG9wXFxcXGNvZGVcXFxcdG95LWVsZW1lbnRcXFxccGFja2FnZXNcXFxcY29yZVxcXFxidWlsZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcSHVhd2VpTW92ZURhdGFcXFxcVXNlcnNcXFxcODYxODZcXFxcRGVza3RvcFxcXFxjb2RlXFxcXHRveS1lbGVtZW50XFxcXHBhY2thZ2VzXFxcXGNvcmVcXFxcYnVpbGRcXFxcdml0ZS5lcy5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0h1YXdlaU1vdmVEYXRhL1VzZXJzLzg2MTg2L0Rlc2t0b3AvY29kZS90b3ktZWxlbWVudC9wYWNrYWdlcy9jb3JlL2J1aWxkL3ZpdGUuZXMuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHsgcmVhZGRpciwgcmVhZGRpclN5bmMgfSBmcm9tIFwiZnNcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IGRlZmVyLCBkZWxheSwgZmlsdGVyLCBtYXAgfSBmcm9tIFwibG9kYXNoLWVzXCI7XHJcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tIFwicm9sbHVwLXBsdWdpbi12aXN1YWxpemVyXCI7XHJcblxyXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cyc7XHJcbmltcG9ydCBzaGVsbCBmcm9tICdzaGVsbGpzJztcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbmltcG9ydCB7aG9va3NQbHVnaW4gYXMgaG9va3N9IGZyb20gXCJAdG95LWVsZW1lbnQvdml0ZS1wbHVnaW5zXCJcclxuaW1wb3J0IHRlcnNlciBmcm9tICdAcm9sbHVwL3BsdWdpbi10ZXJzZXInO1xyXG5cclxuY29uc3QgVFJZX01PVkVfU1RZTEVTX0RFTEFZPTgwMCBhcyBjb25zdFxyXG5jb25zdCBpc1Byb2QgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCI7XHJcbmNvbnN0IGlzRGV2ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwiZGV2ZWxvcG1lbnRcIjtcclxuY29uc3QgaXNUZXN0ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwidGVzdFwiO1xyXG5cclxuZnVuY3Rpb24gbW92ZVN0eWxlcygpIHtcclxuICByZWFkZGlyKFwiLi9kaXN0L2VzL3RoZW1lXCIsIChlcnIpID0+IHtcclxuICAgIGlmIChlcnIpIHJldHVybiBkZWxheShtb3ZlU3R5bGVzLCBUUllfTU9WRV9TVFlMRVNfREVMQVkpO1xyXG4gICAgZGVmZXIoKCkgPT4gc2hlbGwubXYoXCIuL2Rpc3QvZXMvdGhlbWVcIiwgXCIuL2Rpc3RcIikpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0RGlyZWN0b3JpZXNTeW5jKGJhc2VQYXRoOiBzdHJpbmcpIHtcclxuICBjb25zdCBlbnRyaWVzID0gcmVhZGRpclN5bmMoYmFzZVBhdGgsIHsgd2l0aEZpbGVUeXBlczogdHJ1ZSB9KTtcclxuXHJcbiAgcmV0dXJuIG1hcChcclxuICAgIGZpbHRlcihlbnRyaWVzLCAoZW50cnkpID0+IGVudHJ5LmlzRGlyZWN0b3J5KCkpLFxyXG4gICAgKGVudHJ5KSA9PiBlbnRyeS5uYW1lXHJcbiAgKTtcclxufVxyXG4vLyBcdTVCOUFcdTRFNDlWaXRlXHU5MTREXHU3RjZFXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgLy8gXHU1RTk0XHU3NTI4XHU2M0QyXHU0RUY2XHVGRjBDXHU4RkQ5XHU5MUNDXHU1M0VBXHU1RTk0XHU3NTI4XHU0RTg2dnVlXHU2M0QyXHU0RUY2XHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKCksIFxyXG4gICAgdmlzdWFsaXplcih7XHJcbiAgICAgIGZpbGVuYW1lOiBcImRpc3Qvc3RhdHMuZXMuaHRtbFwiLFxyXG4gICAgfSksXHJcbiAgICBkdHMoe1xyXG4gICAgdHNjb25maWdQYXRoOiAnLi4vLi4vdHNjb25maWcuYnVpbGQuanNvbicsXHJcbiAgICBvdXREaXI6IFwiZGlzdC90eXBlc1wiXHJcbiAgICB9KSxcclxuICAgIGhvb2tzKHtcclxuICAgICAgcm1GaWxlczpbJy4vZGlzdC9lcycsJy4vZGlzdC90aGVtZScsJy4vZGlzdC90eXBlcyddLFxyXG4gICAgICBhZnRlckJ1aWxkOiBtb3ZlU3R5bGVzLFxyXG4gICAgfSksXHJcbiAgICB0ZXJzZXIoe1xyXG4gICAgICBjb21wcmVzczoge1xyXG4gICAgICAgIHNlcXVlbmNlczogaXNQcm9kLFxyXG4gICAgICAgIGFyZ3VtZW50czogaXNQcm9kLFxyXG4gICAgICAgIGRyb3BfY29uc29sZTogaXNQcm9kICYmIFtcImxvZ1wiXSxcclxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiBpc1Byb2QsXHJcbiAgICAgICAgcGFzc2VzOiBpc1Byb2QgPyA0IDogMSxcclxuICAgICAgICBnbG9iYWxfZGVmczoge1xyXG4gICAgICAgICAgXCJAREVWXCI6IEpTT04uc3RyaW5naWZ5KGlzRGV2KSxcclxuICAgICAgICAgIFwiQFBST0RcIjogSlNPTi5zdHJpbmdpZnkoaXNQcm9kKSxcclxuICAgICAgICAgIFwiQFRFU1RcIjogSlNPTi5zdHJpbmdpZnkoaXNUZXN0KSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICBmb3JtYXQ6IHtcclxuICAgICAgICBzZW1pY29sb25zOiBmYWxzZSxcclxuICAgICAgICBzaG9ydGhhbmQ6IGlzUHJvZCxcclxuICAgICAgICBicmFjZXM6ICFpc1Byb2QsXHJcbiAgICAgICAgYmVhdXRpZnk6ICFpc1Byb2QsXHJcbiAgICAgICAgY29tbWVudHM6ICFpc1Byb2QsXHJcbiAgICAgIH0sXHJcbiAgICAgIG1hbmdsZToge1xyXG4gICAgICAgIHRvcGxldmVsOiBpc1Byb2QsXHJcbiAgICAgICAgZXZhbDogaXNQcm9kLFxyXG4gICAgICAgIGtlZXBfY2xhc3NuYW1lczogaXNEZXYsXHJcbiAgICAgICAga2VlcF9mbmFtZXM6IGlzRGV2LFxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcbiAgXSxcclxuICBidWlsZDoge1xyXG4gICAgLy8gXHU2Nzg0XHU1RUZBXHU4RjkzXHU1MUZBXHU3NkVFXHU1RjU1XHJcbiAgICBvdXREaXI6ICdkaXN0L2VzJyxcclxuICAgIG1pbmlmeTogZmFsc2UsXHJcbiAgICBjc3NDb2RlU3BsaXQ6IHRydWUsXHJcbiAgICAvLyBcdTVCOUFcdTRFNDlcdTVFOTNcdTkxNERcdTdGNkVcclxuICAgIGxpYjoge1xyXG4gICAgICAvLyBcdTUxNjVcdTUzRTNcdTY1ODdcdTRFRjZcdThERUZcdTVGODRcclxuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnLi4vaW5kZXgudHMnKSxcclxuICAgICAgLy8gXHU1RTkzXHU1NDBEXHU3OUYwXHJcbiAgICAgIG5hbWU6ICdUb3lFbGVtZW50JyxcclxuICAgICAgLy8gXHU4RjkzXHU1MUZBXHU2NTg3XHU0RUY2XHU1NDBEXHJcbiAgICAgIGZpbGVOYW1lOiAnaW5kZXgnLFxyXG4gICAgICAvLyBcdTY1MkZcdTYzMDFcdTc2ODRcdTY4M0NcdTVGMEZcclxuICAgICAgZm9ybWF0czogWydlcyddXHJcbiAgICB9LFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAvLyBcdTU5MTZcdTkwRThcdTRGOURcdThENTZcdTUyMTdcdTg4NjhcclxuICAgICAgZXh0ZXJuYWw6IFtcclxuICAgICAgICAndnVlJyxcclxuICAgICAgICBcIkBmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZVwiLFxyXG4gICAgICAgIFwiQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zXCIsXHJcbiAgICAgICAgXCJAZm9ydGF3ZXNvbWUvdnVlLWZvbnRhd2Vzb21lXCIsXHJcbiAgICAgICAgXCJAcG9wcGVyanMvY29yZVwiLFxyXG4gICAgICAgIFwiYXN5bmMtdmFsaWRhdG9yXCIsXHJcbiAgICAgIF0sXHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIC8vIFx1OEQ0NFx1NkU5MFx1NjU4N1x1NEVGNlx1NTQ3RFx1NTQwRFx1ODlDNFx1NTIxOVxyXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoYXNzZXRJbmZvKSA9PiB7XHJcbiAgICAgICAgICBpZiAoYXNzZXRJbmZvLm5hbWUgPT09ICdzdHlsZS5jc3MnKSByZXR1cm4gJ2luZGV4LmNzcyc7XHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIGFzc2V0SW5mby50eXBlID09PSAnYXNzZXQnICYmXHJcbiAgICAgICAgICAgIC9cXC4oY3NzKSQvaS50ZXN0KGFzc2V0SW5mby5uYW1lIGFzIHN0cmluZylcclxuICAgICAgICAgICl7XHJcbiAgICAgICAgICAgIHJldHVybiBcInRoZW1lL1tuYW1lXS5bZXh0XVwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGFzc2V0SW5mby5uYW1lIGFzIHN0cmluZztcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIFx1NjgzOVx1NjM2RVx1NEYyMFx1NTE2NVx1NzY4NGlkXHU4RkRCXHU4ODRDXHU3NkY4XHU1RTk0XHU3Njg0XHU1OTA0XHU3NDA2XHU5MDNCXHU4RjkxXHJcbiAgICAgICAgbWFudWFsQ2h1bmtzKGlkKSB7XHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJub2RlX21vZHVsZXNcIikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwidmVuZG9yXCI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCIvcGFja2FnZXMvaG9va3NcIikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiaG9va3NcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgaWQuaW5jbHVkZXMoXCIvcGFja2FnZXMvdXRpbHNcIil8fFxyXG4gICAgICAgICAgICBpZC5pbmNsdWRlcygncGx1Z2luLXZ1ZTpleHBvcnQtaGVscGVyJylcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJ1dGlsc1wiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGdldERpcmVjdG9yaWVzU3luYyhcIi4uL2NvbXBvbmVudHNcIikpIHtcclxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKGAvcGFja2FnZXMvY29tcG9uZW50cy8ke2l0ZW19YCkpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29uc29sZS5sb2coaWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSkiXSwKICAibWFwcGluZ3MiOiAiO0FBQTBhLFNBQVMsb0JBQW9CO0FBQ3ZjLFNBQVMsU0FBUyxtQkFBbUI7QUFDckMsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsT0FBTyxPQUFPLFFBQVEsV0FBVztBQUMxQyxTQUFTLGtCQUFrQjtBQUUzQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sU0FBUztBQUNoQixTQUFRLGVBQWUsYUFBWTtBQUNuQyxPQUFPLFlBQVk7QUFWbkIsSUFBTSxtQ0FBbUM7QUFZekMsSUFBTSx3QkFBc0I7QUFDNUIsSUFBTSxTQUFTLFFBQVEsSUFBSSxhQUFhO0FBQ3hDLElBQU0sUUFBUSxRQUFRLElBQUksYUFBYTtBQUN2QyxJQUFNLFNBQVMsUUFBUSxJQUFJLGFBQWE7QUFFeEMsU0FBUyxhQUFhO0FBQ3BCLFVB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

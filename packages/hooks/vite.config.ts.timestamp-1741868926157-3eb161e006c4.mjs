// vite.config.ts
import { resolve } from "path";
import { defineConfig } from "file:///D:/HuaweiMoveData/Users/86186/Desktop/code/oxo-ui/node_modules/.pnpm/vite@5.4.14_@types+node@20.17.24_sass@1.85.1_terser@5.39.0/node_modules/vite/dist/node/index.js";
import { last, split, first, includes } from "file:///D:/HuaweiMoveData/Users/86186/Desktop/code/oxo-ui/node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/lodash.js";
import { hooksPlugin as hooks } from "file:///D:/HuaweiMoveData/Users/86186/Desktop/code/oxo-ui/libs/vite-plugins/.dist/index.js";
import dts from "file:///D:/HuaweiMoveData/Users/86186/Desktop/code/oxo-ui/node_modules/.pnpm/vite-plugin-dts@4.5.3_@types+node@20.17.24_rollup@4.35.0_typescript@5.8.2_vite@5.4.14_@types+_jqhtruyztbn74svhc4a4r4wzpm/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\HuaweiMoveData\\Users\\86186\\Desktop\\code\\oxo-ui\\packages\\hooks";
var vite_config_default = defineConfig({
  plugins: [
    dts({
      include: ["./**/*.ts"],
      exclude: ["./vite.config.ts"]
    }),
    hooks({
      rmFiles: ["./dist"]
    })
  ],
  build: {
    minify: false,
    lib: {
      entry: resolve(__vite_injected_original_dirname, "./index.ts"),
      name: "hooks",
      fileName: "index",
      formats: ["es"]
    },
    rollupOptions: {
      external: ["vue", "lodash-es", "vue3-i18n"],
      output: {
        manualChunks(id) {
          if (includes(id, "/packages/hooks/use"))
            return first(split(last(split(id, "/")), "."));
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxIdWF3ZWlNb3ZlRGF0YVxcXFxVc2Vyc1xcXFw4NjE4NlxcXFxEZXNrdG9wXFxcXGNvZGVcXFxcb3hvLXVpXFxcXHBhY2thZ2VzXFxcXGhvb2tzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxIdWF3ZWlNb3ZlRGF0YVxcXFxVc2Vyc1xcXFw4NjE4NlxcXFxEZXNrdG9wXFxcXGNvZGVcXFxcb3hvLXVpXFxcXHBhY2thZ2VzXFxcXGhvb2tzXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9IdWF3ZWlNb3ZlRGF0YS9Vc2Vycy84NjE4Ni9EZXNrdG9wL2NvZGUvb3hvLXVpL3BhY2thZ2VzL2hvb2tzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCB7IGxhc3QsIHNwbGl0LCBmaXJzdCwgaW5jbHVkZXMgfSBmcm9tIFwibG9kYXNoLWVzXCI7XHJcbmltcG9ydCB7IGhvb2tzUGx1Z2luIGFzIGhvb2tzIH0gZnJvbSBcIkBveG8tdWkvdml0ZS1wbHVnaW5zXCI7XHJcblxyXG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgZHRzKHtcclxuICAgICAgaW5jbHVkZTogW1wiLi8qKi8qLnRzXCJdLFxyXG4gICAgICBleGNsdWRlOiBbXCIuL3ZpdGUuY29uZmlnLnRzXCJdLFxyXG4gICAgfSksXHJcbiAgICBob29rcyh7XHJcbiAgICAgIHJtRmlsZXM6IFtcIi4vZGlzdFwiXSxcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIG1pbmlmeTogZmFsc2UsXHJcbiAgICBsaWI6IHtcclxuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCBcIi4vaW5kZXgudHNcIiksXHJcbiAgICAgIG5hbWU6IFwiaG9va3NcIixcclxuICAgICAgZmlsZU5hbWU6IFwiaW5kZXhcIixcclxuICAgICAgZm9ybWF0czogW1wiZXNcIl0sXHJcbiAgICB9LFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBleHRlcm5hbDogW1widnVlXCIsIFwibG9kYXNoLWVzXCIsIFwidnVlMy1pMThuXCJdLFxyXG4gICAgICBvdXRwdXQ6IHtcclxuICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcclxuICAgICAgICAgIGlmIChpbmNsdWRlcyhpZCwgXCIvcGFja2FnZXMvaG9va3MvdXNlXCIpKVxyXG4gICAgICAgICAgICByZXR1cm4gZmlyc3Qoc3BsaXQobGFzdChzcGxpdChpZCwgXCIvXCIpKSwgXCIuXCIpKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvWSxTQUFTLGVBQWU7QUFDNVosU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxNQUFNLE9BQU8sT0FBTyxnQkFBZ0I7QUFDN0MsU0FBUyxlQUFlLGFBQWE7QUFFckMsT0FBTyxTQUFTO0FBTGhCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxNQUNGLFNBQVMsQ0FBQyxXQUFXO0FBQUEsTUFDckIsU0FBUyxDQUFDLGtCQUFrQjtBQUFBLElBQzlCLENBQUM7QUFBQSxJQUNELE1BQU07QUFBQSxNQUNKLFNBQVMsQ0FBQyxRQUFRO0FBQUEsSUFDcEIsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLEtBQUs7QUFBQSxNQUNILE9BQU8sUUFBUSxrQ0FBVyxZQUFZO0FBQUEsTUFDdEMsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLE1BQ1YsU0FBUyxDQUFDLElBQUk7QUFBQSxJQUNoQjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLE9BQU8sYUFBYSxXQUFXO0FBQUEsTUFDMUMsUUFBUTtBQUFBLFFBQ04sYUFBYSxJQUFJO0FBQ2YsY0FBSSxTQUFTLElBQUkscUJBQXFCO0FBQ3BDLG1CQUFPLE1BQU0sTUFBTSxLQUFLLE1BQU0sSUFBSSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxRQUNqRDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

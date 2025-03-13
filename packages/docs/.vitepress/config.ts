import { defineConfig } from 'vitepress'
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Oxo-UI",
  description: "高仿 ElementPlus 组件库",
  base: '/oxo-ui/',
  appearance: false,

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '开始使用', link: '/get-started' },
      { text: '组建', link: '/components/button' }
    ],
    search: {
      provider: 'local'
    },
    sidebar: [
      {
        text: "指南",
        collapsed: false,
        items: [{ text: "快速开始", link: "/get-started" }],
      },
      {
        text: "基础组件",
        collapsed: false,
        items: [{ text: "Button 按钮", link: "components/button" }],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/oO0oxo0Oo/oxo-ui' }
    ]
  },
  markdown: {
    config:(md)=> {
      md.use(containerPreview);
      md.use(componentPreview);
      
    },
  },
})

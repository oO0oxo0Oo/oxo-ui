import DefaultTheme from "vitepress/theme";
import { type App } from "vue";
import OxoUI from "oxo-ui";
import { ElementPlusContainer } from "vitepress-preview-component";

import "vitepress-preview-component/style.css";
import "oxo-ui/dist/index.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component("demo-preview", ElementPlusContainer);
    app.use(OxoUI);
  },
};

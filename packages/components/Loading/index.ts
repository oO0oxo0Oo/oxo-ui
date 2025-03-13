import { vLoading } from "./directive";
import { Loading } from "./service";
import type { App } from "vue";

export const OxLoading = {
  name: "OxLoading",
  install(app: App) {
    app.directive("loading", vLoading);
    app.config.globalProperties.$loading = Loading;
  },
  directive: vLoading,
  service: Loading,
};

export default OxLoading;

export {
  vLoading,
  vLoading as OxLoadingDirective,
  Loading as OxLoadingService,
};

export * from "./types";

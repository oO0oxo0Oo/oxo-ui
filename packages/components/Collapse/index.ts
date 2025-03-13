import Collapse from "./Collapse.vue";
import CollapseItem from "./CollapseItem.vue";
import { withInstall } from "@oxo-ui/utils";

export const OxCollapse = withInstall(Collapse);
export const OxCollapseItem = withInstall(CollapseItem);

export * from './types'
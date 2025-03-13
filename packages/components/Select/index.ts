import Select from "./Select.vue";
import Option from "./Option.vue";

import { withInstall } from "@oxo-ui/utils";

export const OxSelect = withInstall(Select);
export const OxOption = withInstall(Option);

console.log("Select", Select, "Option", Option);

export * from "./types";

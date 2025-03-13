import Form from "./Form.vue";
import FormItem from "./FormItem.vue";

import { withInstall } from "@oxo-ui/utils";

export const OxForm = withInstall(Form);
export const OxFormItem = withInstall(FormItem);

export * from "./types";
export * from "./hooks";

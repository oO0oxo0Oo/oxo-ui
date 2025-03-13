<script setup lang="ts">
import { ref, computed } from "vue";
import { addUnit } from "@oxo-ui/utils";
import { useLocale } from "@oxo-ui/hooks";
import type { TooltipInstance } from "../Tooltip";
import type { PopconfirmProps, PopconfirmEmits } from "./types";

import OxTooltip from "../Tooltip/Tooltip.vue";
import OxButton from "../Button/Button.vue";
import OxIcon from "../Icon/Icon.vue";

defineOptions({
  name: "OxPopconfirm",
});

const props = withDefaults(defineProps<PopconfirmProps>(), {
  title: "",
  confirmButtonType: "primary",
  icon: "question-circle",
  iconColor: "#f90",
  hideAfter: 200,
  width: 150,
});

const emits = defineEmits<PopconfirmEmits>();
const tooltipRef = ref<TooltipInstance>();
const style = computed(() => ({ width: addUnit(props.width) }));

const locale = useLocale();
 
function hidePopper() {
  tooltipRef.value?.hide();
}

function confrim(e: MouseEvent) {
  emits("confirm", e);
  hidePopper();
}

function cancel(e: MouseEvent) {
  emits("cancel", e);
  hidePopper();
}
</script>

<template>
  <ox-tooltip ref="tooltipRef" trigger="click" :hide-timeout="hideAfter">
    <template #content>
      <div class="ox-popconfirm" :style="style">
        <div class="ox-popconfirm__main">
          <ox-icon v-if="!hideIcon && icon" :icon="icon" :color="iconColor" />
          {{ title }}
        </div>
        <div class="ox-popconfirm__action">
          <ox-button
            class="ox-popconfirm__cancel"
            size="small"
            :type="cancelButtonType"
            @click="cancel"
          >
            {{ cancelButtonText || locale.t("popconfirm.cancelButtonText") }}
          </ox-button>
          <ox-button
            class="ox-popconfirm__confirm"
            size="small"
            :type="confirmButtonType"
            @click="confrim"
          >
            {{ confirmButtonText || locale.t("popconfirm.confirmButtonText") }}
          </ox-button>
        </div>
      </div>
    </template>

    <template v-if="$slots.default" #default>
      <slot name="default"></slot>
    </template>

    <template v-if="$slots.reference" #default>
      <slot name="reference"></slot>
    </template>
  </ox-tooltip>
</template>

<style scoped>
@import "./style.css";
</style>

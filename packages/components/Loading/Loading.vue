<script setup lang="ts">
import type { LoadingOptions } from "./types";
import { computed, type Ref } from "vue";
import { isString } from "lodash-es";
import OxIcon from "../Icon/Icon.vue";

defineOptions({
  name: "OxLoading",
  inheritAttrs: false,
});
const props = defineProps<LoadingOptions>();

const iconName = computed(() => {
  if (isString(props.spinner)) {
    return props.spinner;
  }
  return "spinner"; // 'circle-notch' 也很好看
});
</script>

<template>
  <transition name="fade-in-linear" @after-leave="onAfterLeave">
    <div
      v-show="(props.visible as Ref).value"
      class="ox-loading ox-loading__mask"
      :class="{ 'is-fullscreen': fullscreen }"
    >
      <div class="ox-loading__spinner">
        <ox-icon v-if="props.spinner !== false" :icon="iconName" spin />
        <p v-if="text" class="ox-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<style>
@import "./style.css";
.ox-loading {
  --ox-loading-bg-color: v-bind(background) !important;
  --ox-loading-z-index: v-bind(zIndex) !important;
}
</style>

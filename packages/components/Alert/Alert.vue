<script setup lang="ts">
import type { AlertProps, AlertEmits, AlertInstance } from "./types";
import { ref, computed } from "vue";
import { typeIconMap } from "@oxo-ui/utils";
import OxIcon from "../Icon/Icon.vue";

defineOptions({
  name: "OxAlert",
});
const props = withDefaults(defineProps<AlertProps>(), {
  effect: "light",
  type: "info",
  closable: true,
});
const emits = defineEmits<AlertEmits>();
const slots = defineSlots();

const visible = ref(true);

const iconName = computed(() => typeIconMap.get(props.type) ?? "circle-info");
const withDescription = computed(() => props.description || slots.default);

function close() {
  visible.value = false;
  emits("close");
}

function open() {
  visible.value = true;
}

defineExpose<AlertInstance>({
  open,
  close,
});
</script>

<template>
  <transition name="ox-alert-fade">
    <div
      v-show="visible"
      class="ox-alert"
      role="alert"
      :class="{
        [`ox-alert__${type}`]: type,
        [`ox-alert__${effect}`]: effect,
        'text-center': center,
      }"
    >
      <ox-icon
        v-if="showIcon"
        class="ox-alert__icon"
        :class="{ 'big-icon': withDescription }"
        :icon="iconName"
      />
      <div class="ox-alert__content">
        <span
          class="ox-alert__title"
          :class="{ 'with-desc': withDescription }"
          :style="{ display: center && !showIcon ? 'flow' : 'inline' }"
        >
          <slot name="title">{{ title }}</slot>
        </span>
        <p class="ox-alert__description">
          <slot>{{ description }}</slot>
        </p>
        <div class="ox-alert__close" v-if="closable">
          <ox-icon @click.stop="close" icon="xmark" />
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
@import "./style.css";
</style>

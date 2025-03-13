<script setup lang="ts">
import type { NotificationProps, NotificationCompInstance } from "./types";
import { computed, onMounted, ref } from "vue";
import { getLastBottomOffset } from "./methods";
import { delay, bind } from "lodash-es";
import { useOffset } from "@oxo-ui/hooks";
import { addUnit } from "@oxo-ui/utils";
import { typeIconMap, RenderVnode } from "@oxo-ui/utils";
import OxIcon from "../Icon/Icon.vue";

defineOptions({ name: "OxNotification" });

const props = withDefaults(defineProps<NotificationProps>(), {
  type: "info",
  duration: 3000,
  offset: 20,
  position: "top-right",
  transitionName: "fade",
  showClose: true,
});

const visible = ref(false);
const notifyRef = ref<HTMLDivElement>();
// div 高度
const boxHeight = ref(0);

const { topOffset, bottomOffset } = useOffset({
  getLastBottomOffset: bind(getLastBottomOffset, props),
  offset: props.offset,
  boxHeight,
});

const iconName = computed(() => typeIconMap.get(props.type) ?? "circle-info");

const horizontalClass = computed(() =>
  props.position.endsWith("right") ? "right" : "left"
);

const verticalProperty = computed(() =>
  props.position.startsWith("top") ? "top" : "bottom"
);

const customStyle = computed(() => ({
  [verticalProperty.value]: addUnit(topOffset.value),
  zIndex: props.zIndex,
}));

let timer: number;
function startTimmer() {
  if (props.duration === 0) return;
  timer = delay(close, props.duration);
}

function clearTimer() {
  clearTimeout(timer);
}

function close() {
  visible.value = false;
}

onMounted(() => {
  visible.value = true;
  startTimmer();
});

defineExpose<NotificationCompInstance>({
  bottomOffset,
  close,
});
</script>

<template>
  <transition
    :name="`ox-notification-${transitionName}`"
    @after-leave="!visible && onDestory()"
    @enter="boxHeight = notifyRef!.getBoundingClientRect().height"
  >
    <div
      ref="notifyRef"
      class="ox-notification"
      :class="{
        [`ox-notification--${type}`]: type,
        [horizontalClass]: true,
        'show-close': showClose,
      }"
      :style="customStyle"
      v-show="visible"
      role="alert"
      @click="onClick"
      @mouseenter="clearTimer"
      @mouseleave="startTimmer"
    >
      <ox-icon v-if="iconName" :icon="iconName" class="ox-notification__icon" />

      <div class="ox-notification__text">
        <div class="ox-notification__title">{{ title }}</div>
        <div class="ox-notification__content">
          <slot>
            <render-vnode v-if="message" :vNode="message" />
          </slot>
        </div>
      </div>
      <div class="ox-notification__close" v-if="showClose">
        <ox-icon icon="xmark" @click.stop="close" />
      </div>
    </div>
  </transition>
</template>

<style>
@import "./style.css";
</style>

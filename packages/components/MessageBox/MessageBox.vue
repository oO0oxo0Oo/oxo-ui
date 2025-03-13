<script setup lang="ts">
import type { MessageBoxProps, MessageBoxAction } from "./types";
import type { InputInstance } from "../Input/types";
import { useZIndex, useId } from "@oxo-ui/hooks";
import { typeIconMap } from "@oxo-ui/utils";
import { reactive, computed, ref, watch, nextTick, type Ref } from "vue";

import OxOverlay from "../Overlay/Overlay.vue";
import OxIcon from "../Icon/Icon.vue";
import OxButton from "../Button/Button.vue";
import OxInput from "../Input/Input.vue";
import { isFunction, isNil } from "lodash-es";

defineOptions({
  name: "OxMessageBox",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<MessageBoxProps>(), {
  lockScroll: true,
  showClose: true,
  closeOnClickModal: true,
  confirmButtonType: "primary",
  roundButton: false,
  boxType: "",
  inputValue: "",
  inputPlaceholder: "Please input...",
  confirmButtonText: "Ok",
  cancelButtonText: "Cancel",
  showConfirmButton: true,
});

const { doAction } = props;
const { nextZIndex } = useZIndex();

const headerRef = ref<HTMLElement>();
const inputRef = ref<InputInstance>();
const inputId = useId();

const state = reactive({
  ...props,
  zIndex: nextZIndex(),
});

const hasMessage = computed(() => !!state.message);
const iconComponent = computed(
  () => state.icon ?? typeIconMap.get(state.type ?? "")
);

watch(
  ()=> props.visible?.value,
  val=>{
    if(val) state.zIndex = nextZIndex();
    if(props.boxType !== 'prompt') return

    if(!val) return

    nextTick(()=>{
      inputRef.value && inputRef.value.focus()
    })
  }
)

function handleWrapperClick() {
  props.closeOnClickModal && handleAction("close");
}

function handleInputEnter(e: KeyboardEvent) {
  if (state.inputType === "textarea") return;
  e.preventDefault();
  return handleAction("confirm");
}

function handleAction(action: MessageBoxAction) {
  isFunction(props.beforeClose)
    ? props.beforeClose(action, state, () => doAction(action, state.inputValue))
    : doAction(action, state.inputValue);
}

function handleClose() {
  handleAction("close");
}
</script>

<template>
  <transition name="fade-in-linear" @after-leave="destroy">
    <ox-overlay v-show="(visible as Ref).value" :z-index="state.zIndex" mask>
      <div
        role="dialog"
        class="ox-overlay-message-box"
        @click="handleWrapperClick"
      >
        <div
          ref="rootRef"
          :class="[
            'ox-message-box',
            {
              'is-center': state.center,
            },
          ]"
          @click.stop
        >
          <div
            v-if="!isNil(state.title)"
            ref="headerRef"
            class="ox-message-box__header"
            :class="{ 'show-close': state.showClose }"
          >
            <div class="ox-message-box__title">
              <ox-icon
                v-if="iconComponent && state.center"
                :class="{
                  [`ox-icon-${state.type}`]: state.type,
                }"
                :icon="iconComponent"
              />
              {{ state.title }}
            </div>
            <button
              v-if="showClose"
              class="ox-message-box__header-btn"
              @click.stop="handleClose"
            >
              <ox-icon icon="xmark" />
            </button>
          </div>
          <div class="ox-message-box__content">
            <ox-icon
              v-if="iconComponent && !state.center && hasMessage"
              :class="{
                [`ox-icon-${state.type}`]: state.type,
              }"
              :icon="iconComponent"
            />
            <div v-if="hasMessage" class="ox-message-box__message">
              <slot>
                <component
                  :is="state.showInput ? 'label' : 'p'"
                  :for="state.showInput ? inputId : void 0"
                >
                  {{ state.message }}
                </component>
              </slot>
            </div>
          </div>
          <div v-show="state.showInput" class="ox-message-box__input">
            <ox-input
              v-model="state.inputValue"
              ref="inputRef"
              :placeholder="state.inputPlaceholder"
              :type="state.inputType"
              @keyup.enter="handleInputEnter"
            />
          </div>
          <div class="ox-message-box__footer">
            <ox-button
              v-if="state.showCancelButton"
              class="ox-message-box__footer-btn ox-message-box__cancel-btn"
              :type="state.cancelButtonType"
              :round="state.roundButton"
              :loading="state.cancelButtonLoading"
              @click="handleAction('cancel')"
              @keydown.prevent.enter="handleAction('cancel')"
              >{{ state.cancelButtonText }}</ox-button
            >
            <ox-button
              v-show="state.showConfirmButton"
              class="ox-message-box__footer-btn ox-message-box__confirm-btn"
              :type="state.confirmButtonType ?? 'primary'"
              :round="state.roundButton"
              :loading="state.confirmButtonLoading"
              @click="handleAction('confirm')"
              @keydown.prevent.enter="handleAction('confirm')"
              >{{ state.confirmButtonText }}</ox-button
            >
          </div>
        </div>
      </div>
    </ox-overlay>
  </transition>
</template>

<style>
@import './style.css';
</style>
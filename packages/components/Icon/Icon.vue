<script setup lang="ts">
/**
 * 定义一个自定义图标组件，基于FontAwesome图标库。
 * 组件接收一个IconProps类型的props，允许用户定义图标类型、颜色等属性。
 * 通过计算属性filterProps过滤掉不需要传递给FontAwesomeIcon的props，
 * 并通过customStyles计算出应用到图标上的自定义样式。
 */
import { type IconProps } from "./types"; // 导入IconProps类型定义
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"; // 导入FontAwesomeIcon组件
import { omit } from "lodash-es"; // 导入omit函数，用于从对象中排除特定属性
import { computed } from "vue"; // 导入computed函数，用于创建计算属性

// 定义组件选项，设置组件名称和继承Attrs选项
defineOptions({
  name: "OxIcon",
  inheritAttrs: false
})

// 定义组件的props，类型为IconProps
const props = defineProps<IconProps>()

// 计算属性filterProps，用于传递给FontAwesomeIcon组件，排除掉"type"和"color"属性
const filterProps = computed(() => omit(props, ["type", "color"]));

// 计算属性customStyles，用于设置图标的自定义样式，特别是颜色
const customStyles = computed(() => ({ color: props.color ?? void 0 }));

</script>

<template>
  <!-- 定义模板，渲染图标。通过class和style属性应用图标样式，通过v-bind传递额外的属性给图标 -->
  <i class="ox-icon" :class="{ [`ox-icon--${type}`]: type }" :style="customStyles" v-bind="$attrs">
    <font-awesome-icon v-bind="filterProps" />
  </i>
</template>

<style>
@import "./style.css";
</style>
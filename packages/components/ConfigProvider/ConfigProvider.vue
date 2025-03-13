<script setup lang="ts">
import type { ConfigProviderProps } from "./types";
import { provideGlobalConfig } from "./hooks";

defineOptions({
  name: "OxConfigProvider",
});
const props = defineProps<ConfigProviderProps>();
const config = provideGlobalConfig(props);
</script>

<template>
  <slot name="default" :config="config"></slot>
</template>

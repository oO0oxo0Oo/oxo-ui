<script setup>
import { OxMessage } from "oxo-ui";

function handleClose() {
  OxMessage.info("close callback");
}
</script>
<template>
  <div class="basic block">
    <ox-alert title="Unclosable alert" type="success" :closable="false" />
    <ox-alert title="Alert with callback" type="warning" @close="handleClose" />
  </div>
</template>

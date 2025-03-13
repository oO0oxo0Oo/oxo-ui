<script setup>
function handleBtnClick() {
  console.log("btn click");
}
</script>

<template>
  <p>
    <ox-button @click="handleBtnClick"> with throttle</ox-button>
    <ox-button :use-throttle="false" @click="handleBtnClick"
      >without throttle</ox-button
    >
  </p>
</template>

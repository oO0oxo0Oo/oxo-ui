<template>
  <div>
    <ox-button type="primary" loading>Loading</ox-button>
    <ox-button type="primary" loading-icon="circle-notch" loading
      >Loading</ox-button
    >
    <ox-button type="primary" loading>
      <template #loading>
        <ox-icon style="margin-right: 6px" icon="star" spin />
      </template>
      Loading
    </ox-button>
  </div>
</template>

<template>
  <h2>通过 slot 传入内容</h2>
  <div style="max-width: 600px">
    <ox-alert type="success">Success alert</ox-alert>
    <ox-alert type="info">Info alert</ox-alert>
    <ox-alert type="warning">Warning alert</ox-alert>
    <ox-alert type="danger">Error alert</ox-alert>
  </div>
  <h2>通过 prop 传入内容</h2>
  <div style="max-width: 600px">
    <ox-alert type="success" title="Success alert" />
    <ox-alert type="info" title="Info alert" />
    <ox-alert type="warning" title="Warning alert" />
    <ox-alert type="danger" title="Error alert" />
  </div>
</template>

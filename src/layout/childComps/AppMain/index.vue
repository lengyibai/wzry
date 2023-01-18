<template>
  <div class="app-main">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>
<style scoped>
@import url("./index.less");
</style>

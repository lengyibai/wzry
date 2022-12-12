<template>
  <div class="app-main">
    <router-view v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </router-view>
  </div>
</template>
<style scoped>
@import url("./index.less");
</style>

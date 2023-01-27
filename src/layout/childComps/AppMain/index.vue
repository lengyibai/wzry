<template>
  <div class="app-main">
    <router-view v-slot="{ Component }">
      <KeepAlive include="hero,skin,equip,epigraph,add,database">
        <component :is="Component" />
      </KeepAlive>
    </router-view>
  </div>
</template>
<style scoped>
@import url("./index.less");
</style>

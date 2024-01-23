<script lang="ts" setup>
import { $loading } from "@/utils";

const onComponentMounted = () => {
  $loading.close();
};
</script>

<template>
  <transition name="app-main" appear>
    <div class="app-main">
      <router-view v-slot="{ Component }">
        <KeepAlive include="Hero,Skin,Savor,Equip,Epigraph,Add,Database">
          <component :is="Component" @vue:mounted="onComponentMounted" />
        </KeepAlive>
      </router-view>
    </div>
  </transition>
</template>

<style scoped>
@import url("./index.less");
</style>

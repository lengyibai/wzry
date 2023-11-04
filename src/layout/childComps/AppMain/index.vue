<script lang="ts" setup>
import { $loading } from "@/utils";

const onComponentMounted = () => {
  $loading.close();
};
</script>

<template>
  <div class="app-main">
    <router-view v-slot="{ Component }">
      <KeepAlive include="hero,skin,savor,equip,epigraph,add,database">
        <component :is="Component" @vue:mounted="onComponentMounted" />
      </KeepAlive>
    </router-view>
  </div>
</template>

<style scoped>
@import url("./index.less");
</style>

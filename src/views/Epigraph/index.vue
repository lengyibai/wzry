<script setup lang="ts">
import { onActivated } from "vue";

import EpigraphList from "./views/EpigraphList/index.vue";
import EpigraphCollocation from "./views/EpigraphCollocation/index.vue";

import { EpigraphStore, AudioStore } from "@/store";

defineOptions({
  name: "Epigraph",
});

const comps = {
  LIST: EpigraphList,
  COLLOCATION: EpigraphCollocation,
};

const $epigraphStore = EpigraphStore();
const $audioStore = AudioStore();

$epigraphStore.getEpigraph();

onActivated(() => {
  $audioStore.play("h7t9");
});
</script>

<template>
  <div class="epigraph">
    <component :is="comps[$epigraphStore.status]"></component>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

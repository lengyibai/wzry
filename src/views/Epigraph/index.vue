<script setup lang="ts">
import { onActivated } from "vue";

import EpigraphList from "./views/EpigraphList/index.vue";
import EpigraphCollocation from "./views/EpigraphCollocation/index.vue";

import { EpigraphStore } from "@/store";
import { usePlayAudio } from "@/hooks";

defineOptions({
  name: "Epigraph",
});

const { playAudio } = usePlayAudio();

const comps = {
  LIST: EpigraphList,
  COLLOCATION: EpigraphCollocation,
};

const $epigraphStore = EpigraphStore();

$epigraphStore.getEpigraph();

onActivated(() => {
  playAudio("h7t9");
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

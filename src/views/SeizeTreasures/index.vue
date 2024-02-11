<script setup lang="ts">
import { onActivated } from "vue";

import PlayArea from "./components/PlayArea/index.vue";
import DataArea from "./components/DataArea/index.vue";

import { AudioStore } from "@/store";

defineOptions({
  name: "SeizeTreasures",
});

const $audioStore = AudioStore();

onActivated(() => {
  $audioStore.play("bq69");
});
</script>

<template>
  <div class="seize-treasures">
    <PlayArea />
    <DataArea />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

<script setup lang="ts">
import { onActivated } from "vue";

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
  <div class="seize-treasures"></div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

<script setup lang="ts">
import { onActivated } from "vue";

import LotteryToolbar from "../common/components/LotteryToolbar/index.vue";
import SupplyArea from "../common/components/SupplyArea/index.vue";

import LotteryArea from "./components/LotteryArea/index.vue";

import { AudioStore } from "@/store";

defineOptions({
  name: "LotteryHero",
});

const $audioStore = AudioStore();

onActivated(() => {
  $audioStore.play("bq69");
});
</script>

<template>
  <div class="seize-treasures">
    <LotteryToolbar type="HERO" />
    <div class="main">
      <LotteryArea />
      <SupplyArea type="HERO" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

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
    <transition name="to-bottom" appear>
      <LotteryToolbar type="HERO" />
    </transition>

    <div class="main">
      <transition name="to-right-opacity" appear>
        <LotteryArea />
      </transition>

      <transition name="to-left-opacity" appear>
        <SupplyArea type="HERO" />
      </transition>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

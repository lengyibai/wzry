<script setup lang="ts">
import { onActivated } from "vue";

import LotteryToolbar from "../common/components/LotteryToolbar/index.vue";
import SupplyArea from "../common/components/SupplyArea/index.vue";

import LotteryArea from "./components/LotteryArea/index.vue";

import { usePlayAudio } from "@/hooks";

defineOptions({
  name: "LotterySkin",
});

const { playAudio } = usePlayAudio();

onActivated(() => {
  playAudio("bq69");
});
</script>

<template>
  <div class="seize-treasures">
    <transition name="to-bottom" appear>
      <LotteryToolbar type="SKIN" />
    </transition>

    <div class="main">
      <transition name="to-right-opacity" appear>
        <LotteryArea />
      </transition>

      <transition name="to-left-opacity" appear>
        <SupplyArea type="SKIN" />
      </transition>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

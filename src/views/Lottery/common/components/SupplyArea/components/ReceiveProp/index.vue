<script setup lang="ts">
import { storeToRefs } from "pinia";

import { GAME_PROP } from "@/config";
import { KnapsackStore, SupplyStore } from "@/store";
import { KButton } from "@/components/business";
import { $obtain } from "@/utils/busTransfer";
import { _formatSecondsToChinese } from "@/utils/tool";

interface Props {
  /** 补给站是英雄夺宝还是皮肤夺宝 */
  type: "HERO" | "SKIN";
}
const $props = defineProps<Props>();

const $supplyStore = SupplyStore();
const $knapsackStore = KnapsackStore();

const { hero_mode, skin_mode } = storeToRefs($supplyStore);

/** 模式 */
const mode = $props.type === "HERO" ? hero_mode : skin_mode;
/** 抵扣石字段 */
const stone = $props.type === "HERO" ? "HERO_LOTTERY_STONE" : "SKIN_LOTTERY_STONE";

/* 领取 */
const handleReceive = () => {
  const { key, icon, label: name } = GAME_PROP[stone];
  $knapsackStore.setGamePropNum(key, mode.value!.count, "ADD");

  $obtain({
    icon: icon,
    name,
    num: mode.value!.count,
  });

  $supplyStore.setSupplyRemainNum($props.type, mode.value!.count);
  $supplyStore.setSupplyStatus($props.type, "IDLE");
};

/* 领取并继续 */
const handleReceiveAgain = () => {
  handleReceive();
  $supplyStore.startCountdown($props.type);
};
</script>

<template>
  <div class="receive-prop">
    <div class="title">本次时长：{{ _formatSecondsToChinese(mode!.seconds) }}</div>
    <div class="prop">
      <div
        class="icon"
        :style="{
          backgroundImage: `url(${GAME_PROP[stone].icon})`,
        }"
      ></div>
      <div class="count">×{{ mode?.count }}</div>
    </div>

    <div class="btns">
      <KButton class="k-button" type="warning" @click="handleReceive">领取</KButton>
      <KButton class="k-button" type="warning" @click="handleReceiveAgain">领取并继续</KButton>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { GAME_PROP } from "@/config";
import { SupplyStore, TaskStore } from "@/store";
import { KButton } from "@/components/business";
import { $obtain } from "@/utils/busTransfer";
import { _formatSecondsToChinese } from "@/utils/tool";
import { _getPropLink } from "@/utils/concise";
import { vMouseTip } from "@/directives";

interface Props {
  /** 补给站是英雄夺宝还是皮肤夺宝 */
  type: "HERO" | "SKIN";
}
const $props = defineProps<Props>();

const $supplyStore = SupplyStore();
const $taskStore = TaskStore();

const { hero_mode, skin_mode } = storeToRefs($supplyStore);

/** 模式 */
const mode = $props.type === "HERO" ? hero_mode : skin_mode;
/** 夺宝石字段 */
const stone = $props.type === "HERO" ? "HERO_LOTTERY_STONE" : "SKIN_LOTTERY_STONE";

/** @description 领取 */
const handleReceive = () => {
  const num = mode.value!.count;

  $obtain({
    icon: _getPropLink(GAME_PROP.ICON[stone]),
    name: GAME_PROP.NAME[stone],
    num,
    key: stone,
  });

  //每日补给任务
  if (stone === "HERO_LOTTERY_STONE") {
    $taskStore.setTaskStatus("today_hero_supply", num);
  } else {
    $taskStore.setTaskStatus("today_skin_supply", num);
  }

  $supplyStore.setSupplyRemainNum($props.type, num);
  $supplyStore.setSupplyStatus($props.type, "IDLE");
};

/** @description 领取并继续 */
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
          backgroundImage: `url(${_getPropLink(GAME_PROP.ICON[stone])})`,
        }"
      ></div>
      <div class="count">×{{ mode?.count }}</div>
    </div>

    <div class="btns">
      <KButton v-mouse-tip class="k-button" type="warning" @click="handleReceive">领取</KButton>
      <KButton v-mouse-tip class="k-button" type="warning" @click="handleReceiveAgain">
        领取并继续
      </KButton>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

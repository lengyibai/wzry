<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";

import { GAME_CONFIG, GAME_PROP } from "@/config";
import { SupplyStore } from "@/store";
import { KButton } from "@/components/business";
import { _getSupplyColor } from "@/utils/privateTool";
import { _getPropLink } from "@/utils/concise";
import { vMouseTip } from "@/directives";
import { usePlayAudio } from "@/hooks";

interface Props {
  /** 补给站是英雄夺宝还是皮肤夺宝 */
  type: "HERO" | "SKIN";
}
const $props = defineProps<Props>();

const $supplyStore = SupplyStore();
const { setTimeMode, startCountdown } = $supplyStore;
const {
  hero_mode,
  skin_mode,
  skin_supply_status,
  hero_supply_status,
  hero_supply_remain_num,
  skin_supply_remain_num,
} = storeToRefs($supplyStore);

const { playAudio } = usePlayAudio();

/** 模式 */
const mode = $props.type === "HERO" ? hero_mode : skin_mode;
/** 状态 */
const supply_status = $props.type === "HERO" ? hero_supply_status : skin_supply_status;
/** 夺宝石字段 */
const stone = $props.type === "HERO" ? "HERO_LOTTERY_STONE" : "SKIN_LOTTERY_STONE";
/** 剩余额度字段 */
const supply_remain_num = $props.type === "HERO" ? hero_supply_remain_num : skin_supply_remain_num;

/** 标题 */
const title = computed(() => {
  const text: Partial<Record<Game.LotterySupply.Status, string>> = {
    SELECT: "请选择补给模式",
    READY: "准备开始",
  };
  return text[supply_status.value];
});

/** @description 选择模式
 * @param index 补给模式索引
 */
const handleSelect = (index: number) => {
  setTimeMode($props.type, index);
  playAudio("v6p0");
};

/** @description 开始倒计时 */
const handleStart = () => {
  playAudio("pj83");
};
</script>

<template>
  <div class="supply-mode">
    <div class="title">{{ title }}</div>
    <div v-if="supply_status === 'SELECT'" class="mode-list">
      <div
        v-for="(item, index) in GAME_CONFIG.LOTTERY_SUPPLY_MODE"
        :key="index"
        v-mouse-tip
        :class="_getSupplyColor(item.seconds)"
        class="mode"
        :data-text="item.label"
        @click="handleSelect(index)"
      >
        {{ item.label }}
      </div>
    </div>

    <div v-if="supply_status === 'READY' && mode" class="ready-start">
      <div class="desc" :class="_getSupplyColor(mode.seconds)">
        {{ mode.label }}
      </div>
      <div class="tip">
        <div class="text">倒计时结束后可领取</div>
        <div class="prop">
          <img :src="_getPropLink(GAME_PROP.ICON[stone])" alt="" class="icon" />
          <span>×{{ mode.count }}</span>
        </div>
      </div>

      <div class="btns">
        <KButton
          v-mouse-tip
          class="k-button"
          type="warning"
          @click="startCountdown(type), handleStart()"
        >
          开始
        </KButton>
      </div>
    </div>

    <div class="supply-remain-num">
      <div class="label">今日补给剩余额度：</div>
      <div class="value">{{ supply_remain_num }}</div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

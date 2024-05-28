<script setup lang="ts">
import { computed, onActivated, onDeactivated, watch } from "vue";

import { useAnimateMove } from "./hooks/useAnimateMove";

import { SupplyStore } from "@/store";
import { KScrollCountdown } from "@/components/business";

interface Props {
  /** 补给站是英雄夺宝还是皮肤夺宝 */
  type: "HERO" | "SKIN";
}
const $props = defineProps<Props>();

const $supplyStore = SupplyStore();

const { circularRef, img, startAnimate, clearAnimate } = useAnimateMove();

/** 倒计时数字列表 */
const nums = computed(() => {
  return $props.type === "HERO" ? $supplyStore.hero_countdown : $supplyStore.skin_countdown;
});
/** 是否处于运行中 */
const running = computed(() => {
  const status =
    $props.type === "HERO" ? $supplyStore.hero_supply_status : $supplyStore.skin_supply_status;
  return status === "RUNNING";
});

watch(running, (v) => {
  if (v) {
    startAnimate();
  } else {
    clearAnimate();
  }
});

onActivated(() => {
  if (!running.value) return;
  startAnimate();
});

onDeactivated(clearAnimate);

defineExpose({
  /** 清除动画 */
  _clearAnimate: clearAnimate,
});
</script>

<template>
  <div class="animate-move">
    <img :src="img" class="bg" alt="" />
    <div
      v-show="running"
      ref="circularRef"
      class="circular"
      :style="{
        backgroundImage: `url(${img})`,
      }"
    ></div>

    <transition name="fade">
      <KScrollCountdown v-if="running" class="k-scroll-countdown" :nums="nums" />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

<script setup lang="ts">
import { computed, onActivated, onDeactivated, ref, watch } from "vue";
import { storeToRefs } from "pinia";

import { useAnimateMove } from "./hooks/useAnimateMove";
import Countdown from "./components/Countdown/index.vue";

import { SupplyStore } from "@/store";

interface Props {
  /** 补给站是英雄夺宝还是皮肤夺宝 */
  type: "HERO" | "SKIN";
}
const $props = defineProps<Props>();

const $supplyStore = SupplyStore();

const { hero_supply_status, skin_supply_status } = storeToRefs($supplyStore);

const circularRef = ref<HTMLElement>();

const { img, startAnimate, clearAnimate } = useAnimateMove(circularRef);

/** 是否处于运行中 */
const running = computed(() => {
  const status = $props.type === "HERO" ? hero_supply_status.value : skin_supply_status.value;
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
      <Countdown v-show="running" :type="type" />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

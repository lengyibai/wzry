<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";

import NumScroll from "./components/NumScroll/index.vue";

import { SupplyStore } from "@/store";

interface Props {
  /** 补给站是英雄夺宝还是皮肤夺宝 */
  type: "HERO" | "SKIN";
}
const $props = defineProps<Props>();

const $supplyStore = SupplyStore();

const { hero_countdown, skin_countdown, hero_supply_status, skin_supply_status } =
  storeToRefs($supplyStore);

/** 倒计时数字列表 */
const num_list = computed(() => {
  return $props.type === "HERO" ? hero_countdown.value : skin_countdown.value;
});
/** 是否处于运行中 */
const running = computed(() => {
  const status = $props.type === "HERO" ? hero_supply_status.value : skin_supply_status.value;
  return status === "RUNNING";
});

//通过索引号获取倒计时每个数字
const transform = computed(() => {
  return (index: number) => `translateY(-${num_list.value[index]}0%)`;
});
</script>

<template>
  <div class="countdown">
    <NumScroll :transform="transform(0)" />
    <NumScroll :transform="transform(1)" />
    <div
      class="dot"
      :class="{
        running: running,
      }"
    >
      :
    </div>
    <NumScroll :transform="transform(2)" />
    <NumScroll :transform="transform(3)" />
    <div
      class="dot"
      :class="{
        running: running,
      }"
    >
      :
    </div>
    <NumScroll :transform="transform(4)" />
    <NumScroll :transform="transform(5)" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

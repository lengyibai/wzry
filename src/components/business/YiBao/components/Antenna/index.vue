<script setup lang="ts">
import { inject } from "vue";
import { storeToRefs } from "pinia";

import { YibaoStore } from "@/store";

const $yibaoStore = YibaoStore();
const { temp_part_detail } = storeToRefs($yibaoStore);

/** 乂宝大小类型 */
const yibao_type = inject<"small" | "big">("yibao-type");
</script>

<template>
  <div
    ref="antennasRef"
    class="antennas"
    :class="[
      yibao_type,
      {
        img: temp_part_detail.antenna.type === 'IMG',
        color: temp_part_detail.antenna.type === 'COLOR',
      },
    ]"
  >
    <div v-for="(_, index) in 2" :key="index" class="antenna">
      <div class="antenna-side antenna-top"></div>
      <div class="antenna-side antenna-bottom"></div>
      <div class="antenna-side antenna-left"></div>
      <div class="antenna-side antenna-right"></div>
      <div class="antenna-side antenna-front"></div>
      <div class="antenna-side antenna-back"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

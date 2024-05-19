<script setup lang="ts">
import { storeToRefs } from "pinia";
import { inject } from "vue";

import { YibaoStore } from "@/store";

const $yibaoStore = YibaoStore();
const { temp_part_detail } = storeToRefs($yibaoStore);

/** 乂宝大小类型 */
const yibao_type = inject<"small" | "big">("yibao-type");
</script>

<template>
  <div
    class="annulus"
    :class="[
      yibao_type,
      {
        img: temp_part_detail.annulus.type === 'IMG',
        color: temp_part_detail.annulus.type === 'COLOR',
      },
    ]"
  >
    <div v-for="(item, index) in 4" :key="index" :style="`--i:${item}`" class="circle"></div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

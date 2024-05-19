<script setup lang="ts">
import { inject } from "vue";
import { storeToRefs } from "pinia";

import { YibaoStore } from "@/store";
interface Props {
  direction: "left" | "right";
}
defineProps<Props>();

const $yibaoStore = YibaoStore();
const { temp_part_detail } = storeToRefs($yibaoStore);

/** 乂宝大小类型 */
const yibao_type = inject<"small" | "big">("yibao-type");
</script>

<template>
  <div
    class="wing"
    :class="[
      direction,
      yibao_type,
      {
        img: temp_part_detail.wing.type === 'IMG',
        color: temp_part_detail.wing.type === 'COLOR',
      },
    ]"
  >
    <div class="left-wing"></div>
    <div class="right-wing"></div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

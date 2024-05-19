<script setup lang="ts">
import { inject, onMounted } from "vue";
import { ref } from "vue";

import { bigYiBaoMouth } from "../../helper/yiBaoBig";
import { smallYiBaoMouth } from "../../helper/yiBaoSmall";

/** 乂宝大小类型 */
const yibao_type = inject<"small" | "big">("yibao-type");

const mouthRef = ref<HTMLElement>();
const holeRef = ref<HTMLElement>();
const teethRef = ref<HTMLElement>();
const tongueRef = ref<HTMLElement>();

onMounted(() => {
  if (yibao_type === "small") {
    smallYiBaoMouth.init(mouthRef.value!, holeRef.value!, teethRef.value!, tongueRef.value!);
  } else {
    bigYiBaoMouth.init(mouthRef.value!, holeRef.value!, teethRef.value!, tongueRef.value!);
  }
});
</script>

<template>
  <div ref="mouthRef" class="mouth" :class="yibao_type">
    <!-- 嘴巴内部 -->
    <div ref="holeRef" class="hole">
      <!-- 牙齿 -->
      <div ref="teethRef" class="teeth"></div>

      <!-- 舌头 -->
      <div ref="tongueRef" class="tongue"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

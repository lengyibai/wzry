<script setup lang="ts">
import { onMounted, ref } from "vue";

import JumpCoinReceive from "./components/JumpCoinReceive/index.vue";

import { KCheck, YiBao } from "@/components/business";
import { bigYiBaoBody, YibaoKeyframes } from "@/components/business/YiBao/helper/yiBaoBig";
import { vMouseTip } from "@/directives";

const is_drag = ref(false);

/** @description 按下拖动 */
const onDownDrag = (v: boolean) => {
  bigYiBaoBody.toggleDragMove(v);
};

onMounted(() => {
  //为了迎合入场动画
  bigYiBaoBody.body_dom.style.transform = "translateY(-75vh)";
  setTimeout(() => {
    YibaoKeyframes.playAnimation(YibaoKeyframes.jumpLeftJumpRightJumpBackRotateFront);
  }, 500);
});
</script>

<template>
  <div class="yi-bao-stage">
    <div class="switch-list">
      <KCheck v-model="is_drag" v-mouse-tip text="拖拽浏览" @update:model-value="onDownDrag" />
    </div>
    <JumpCoinReceive />
    <YiBao type="big" class="big-yi-bao" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

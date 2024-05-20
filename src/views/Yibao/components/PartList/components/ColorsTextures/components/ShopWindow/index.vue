<script setup lang="ts">
import { vMouseTip } from "@/directives";
import { AudioStore } from "@/store";

interface Props {
  /** 名称 */
  name: string;
  /** 是否选中 */
  active: boolean;
  /** 是否已拥有 */
  owned: boolean;
  /** 价格 */
  price: string;
}
defineProps<Props>();

const $audioStore = AudioStore();
</script>

<template>
  <div v-mouse-tip class="shop-window" @click="$audioStore.play('n4r4')">
    <div class="part" :class="{ active }">
      <slot></slot>

      <!-- 未拥有蒙版 -->
      <div v-if="!owned" class="mask">
        <i class="iconfont wzry-lock"></i>
      </div>
    </div>
    <div class="name">{{ name }}</div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

<script setup lang="ts">
import { computed } from "vue";

import { CONFIG } from "@/config";

interface Props {
  /** 价格 */
  price: number | string;
  /** 隐藏和显示价格信息 */
  toggle: boolean;
}

const $props = defineProps<Props>();

/** 通过判断价格是否为数字来显示点券图标及获取途径 */
const show = computed(() => $props.price && !isNaN(Number($props.price)));
</script>

<template>
  <div class="hero-skin-price" :class="{ show: toggle }">
    <img
      v-show="show"
      :src="CONFIG.BASE.IMGBED + '/image/coupon.png'"
      alt="点券"
    />
    <span v-show="!show && show !== ''">获取途径：</span>
    <span>{{ price }}</span>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

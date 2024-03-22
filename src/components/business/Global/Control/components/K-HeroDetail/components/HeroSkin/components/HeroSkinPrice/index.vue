<script setup lang="ts">
import { computed, ref } from "vue";

import { vAnimateNumber } from "@/directives";

interface Props {
  /** 价格 */
  price: number | string;
  /** 隐藏和显示价格信息 */
  toggle: boolean;
}

const $props = defineProps<Props>();

const priceRef = ref<HTMLElement>();

/** 通过判断价格是否为数字来显示点券图标及获取途径 */
const show = computed(() => $props.price && !isNaN(Number($props.price)));
</script>

<template>
  <div class="hero-skin-price" :class="{ show: toggle }">
    <div v-show="show" class="coupon"></div>
    <span v-show="!show && show !== ''">获取途径：</span>
    <span
      v-if="price"
      ref="priceRef"
      v-animate-number="{
        num: price,
      }"
    ></span>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

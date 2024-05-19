<script setup lang="ts">
import { inject } from "vue";

/** 乂宝大小类型 */
const yibao_type = inject<"small" | "big">("yibao-type");
</script>

<template>
  <div class="blush" :class="yibao_type">
    <div class="blush-left"></div>
    <div class="blush-right"></div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

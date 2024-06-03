<script setup lang="ts">
import { _isPhone } from "@/utils/tool";

const text = _isPhone ? "滑动下一页" : "滚动下一页";
</script>

<template>
  <!-- 向上滚动提示 -->
  <div class="k-scroll-tip">
    <i class="iconfont wzry-down" />
    <div class="text">{{ text }}</div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

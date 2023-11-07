<script setup lang="ts">
interface Props {
  finish: boolean;
}
defineProps<Props>();
</script>

<template>
  <div class="k-loadmore">
    <K-Logo fast :stop="finish" />
    <div class="text">{{ finish ? "暂无更多" : "加载中..." }}</div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

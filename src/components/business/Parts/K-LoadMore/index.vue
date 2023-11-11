<script setup lang="ts">
import KLogo from "@/components/business/Parts/K-Logo/index.vue";

interface Props {
  finish: boolean;
}
defineProps<Props>();
</script>

<template>
  <div class="k-loadmore">
    <KLogo fast :stop="finish" />
    <div class="text">{{ finish ? "暂无更多" : "加载中..." }}</div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

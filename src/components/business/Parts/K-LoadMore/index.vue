<script setup lang="ts">
import KLogo from "@/components/business/Parts/K-Logo/index.vue";

interface Props {
  /** 列表是否加载完毕 */
  finish: boolean;
  /** 是否处于加载中 */
  loading: boolean;
}
defineProps<Props>();
</script>

<template>
  <div
    class="k-loadmore"
    :class="{
      hide: !(loading || finish),
    }"
  >
    <KLogo fast :stop="finish" />
    <div class="text">{{ finish ? "暂无更多" : "加载中..." }}</div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

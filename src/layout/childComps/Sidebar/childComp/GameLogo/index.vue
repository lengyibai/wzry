<script setup lang="ts">
import { Store } from "@/store";

const $collapseStore = Store.collapse();

/* 开始确认刷新计时 */
const handleStartTime = () => {
  setTimeout(() => {
    const flag = confirm("确认清除本地数据重新下载并刷新页面？");
    if (flag) {
      localStorage.clear();
      location.reload();
    }
  }, 2000);
};

/* 刷新页面 */
const handleEndTime = () => {
  location.reload();
};
</script>

<template>
  <div class="game-logo" @touchstart="handleStartTime" @touchend="handleEndTime">
    <transition-group name="fade-a">
      <i class="iconfont wzry-logo" key="icon" />
      <span v-show="!$collapseStore.collapse" key="text">{{ $t("王者图鉴") }}</span>
    </transition-group>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

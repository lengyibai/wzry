<script setup lang="ts">
import { useCollapse } from "../../hooks/useCollapse";

import Logo3D from "./components/Logo3D/index.vue";

const { collapse } = useCollapse();

/** 是否为生产环境 */
const is_prod = true;

/** @description 开始确认刷新计时 */
const handleStartTime = () => {
  setTimeout(() => {
    const flag = confirm("确认清除本地数据重新下载并刷新页面？");
    if (flag) {
      localStorage.clear();
      location.reload();
    }
  }, 2000);
};

/** @description 刷新页面 */
const handleEndTime = () => {
  location.reload();
};
</script>

<template>
  <div class="game-logo" @touchstart="handleStartTime" @touchend="handleEndTime">
    <transition-group name="fade-a">
      <div key="logo">
        <Logo3D v-if="is_prod" key="logo" />
      </div>
      <span v-show="!collapse" key="text">{{ $t("王者图鉴") }}</span>
    </transition-group>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

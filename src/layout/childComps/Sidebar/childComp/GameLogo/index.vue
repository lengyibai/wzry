<script setup lang="ts">
import { CollapseStore } from "@/store";
import { $concise } from "@/utils";

const $collapseStore = CollapseStore();

const { getImgLink } = $concise;

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
  <div
    class="game-logo"
    @touchstart="handleStartTime"
    @touchend="handleEndTime"
  >
    <transition-group name="fade-a">
      <div key="logo" class="logo">
        <img
          :src="getImgLink('logo_inside')"
          alt=""
          class="inside"
          @dragstart.prevent
        />
        <img
          :src="getImgLink('logo_outside')"
          alt=""
          class="outside"
          @dragstart.prevent
        />
      </div>
      <span v-show="!$collapseStore.collapse" key="text">{{
        $t("王者图鉴")
      }}</span>
    </transition-group>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

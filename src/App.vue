<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <transition name="round-clip" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <!-- 全局开关 -->
    <GlobalSwitch />
    <div class="watermark">
      <p>浏览器内核版本：{{ $chromeV() }}</p>
      <p>当前版本：{{ LOCAL_VERSION }}</p>
      <p>最新版本：{{ REMOTE_VERSION }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { $chromeV } from "@/utils/index";
import GlobalSwitch from "@/components/business/GlobalSwitch/index.vue";
import useGetData from "@/hooks/useGetData";
import useVersion from "@/hooks/useVersion";

const { LOCAL_VERSION, REMOTE_VERSION } = useVersion();
useGetData();
</script>
<style scoped lang="less">
.app {
  width: 100vw;
  height: 100vh;

  .watermark {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    color: rgb(255 255 255 / 50%);
    font-size: 12px;
  }
}
</style>

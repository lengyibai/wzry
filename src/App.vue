<script setup lang="ts">
import { $chromeV } from "@/utils";
import GlobalSwitch from "@/components/business/GlobalSwitch/index.vue";
import useVersion from "@/hooks/useVersion";
import otherStore from "@/store/other";

const $otherStore = otherStore();

const { LOCAL_VERSION, REMOTE_VERSION } = useVersion();
</script>

<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <transition name="round-clip" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <!-- 全局开关 -->
    <GlobalSwitch />
    <transition name="fade">
      <div v-show="!$otherStore.collapse" class="watermark">
        <p>浏览器内核版本：{{ $chromeV() }}</p>
        <p>当前版本：{{ LOCAL_VERSION }}</p>
        <p>最新版本：{{ REMOTE_VERSION }}</p>
      </div>
    </transition>

    <!-- 移动端提示横屏浏览 -->
    <LibPhoneTip />
  </div>
</template>

<style scoped lang="less">
.app {
  width: 100vw;
  height: 100vh;

  .watermark {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    color: var(--white-25);
    font-size: 12px;

    p {
      text-shadow: none;
    }
  }
}

/* 圆形路由跳转 */
.round-clip-enter-active {
  animation: round-clip-in 0.75s;
}

.round-clip-leave-active {
  animation: round-clip-out 1.25s;
}

@keyframes round-clip-in {
  0% {
    clip-path: circle(0% at 50% 50%);
  }

  100% {
    clip-path: circle(100% at 50% 50%);
  }
}

@keyframes round-clip-out {
  0% {
    clip-path: circle(100% at 50% 50%);
  }

  100% {
    clip-path: circle(0% at 50% 50%);
  }
}
</style>

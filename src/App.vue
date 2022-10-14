<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <transition name="clip" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <!-- 全局开关 -->
    <GlobalSwitch />
    <div class="watermark">
      <p>当前版本：{{ LOCAL_VERSION }}</p>
      <p>最新版本：{{ REMOTE_VERSION }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import GlobalSwitch from '@/components/business/GlobalSwitch/index.vue';

import switchStore from '@/store/globalSwitch';

const LOCAL_VERSION = ref('22.10.13.00'); //本地版本
const REMOTE_VERSION = ref('正在检查更新...'); //远程版本

/* 检查更新 */
const update = () => {
  REMOTE_VERSION.value = window.REMOTE_VERSION; //来自外部链接的 REMOTE_VERSION
  const local_version = Number(LOCAL_VERSION.value.replaceAll('.', '')); //将本地版本转成数字
  const remote_version = Number(REMOTE_VERSION.value.replaceAll('.', '')); //将远程版本转成数字
  const test = remote_version - local_version;
  if (test > 0) {
    switchStore().$tip('作者已推送最新代码至GitHub，请git pull或重新克隆进行更新', 'warning');
  } else if (test < 0) {
    switchStore().$tip('当前版本大于远程版本', 'error');
  } else {
    switchStore().$tip('当前版本已是最新版，请放心使用！', 'info');
  }
};

/* 每隔五秒检查更新，获取最新版后停止 */
onMounted(() => {
  const timer = setInterval(() => {
    if (REMOTE_VERSION.value) {
      clearInterval(timer);
      update();
    }
  }, 5000);
});
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
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
  }
}

/* 蒙版裁剪 */
.clip-enter-active {
  animation: clip-in 0.75s;
}

.clip-leave-active {
  animation: clip-out 1.25s;
}

@keyframes clip-in {
  0% {
    -webkit-clip-path: circle(0% at 50% 50%);
    clip-path: circle(0% at 50% 50%);
  }

  100% {
    -webkit-clip-path: circle(100% at 50% 50%);
    clip-path: circle(100% at 50% 50%);
  }
}

@keyframes clip-out {
  0% {
    -webkit-clip-path: circle(100% at 50% 50%);
    clip-path: circle(100% at 50% 50%);
  }

  100% {
    -webkit-clip-path: circle(0% at 50% 50%);
    clip-path: circle(0% at 50% 50%);
  }
}
</style>

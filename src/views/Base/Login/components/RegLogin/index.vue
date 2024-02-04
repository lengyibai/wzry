<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import _throttle from "lodash/throttle";

import LoginBox from "./components/LoginBox/index.vue";
import RegBox from "./components/RegBox/index.vue";

import { AudioStore, DeviceStore } from "@/store";
import { $tool } from "@/utils";

const $deviceStore = DeviceStore();
const $audioStore = AudioStore();

const RegLoginRef = ref<HTMLElement>();

/** 注册及登录状态下要显示的输入框及按钮 */
const is_reg = ref(false);

/* 是否前往注册 */
const handleToReg = (status: boolean) => {
  is_reg.value = status;
  $audioStore.play("v6p0");
};

/* 注册成功 */
const onRegSuccess = () => {
  is_reg.value = false;
};

/* 视差动画(如果为移动端或为safari浏览器则取消) */
if (!$tool.isPhone || $deviceStore.browser_name === "safari") {
  const parallax = new $tool.Parallax((x: number, y: number) => {
    if (!RegLoginRef.value) return;
    RegLoginRef.value.style.transform = `translate(-50%, -50%) rotateX(${y * 10}deg) rotateY(${
      -x * 10
    }deg)`;
  });

  const _throttleMove = _throttle((e: MouseEvent) => {
    parallax.move(e);
  }, 50);

  window.addEventListener("mousemove", _throttleMove);
  onUnmounted(() => {
    window.removeEventListener("mousemove", _throttleMove);
  });
}
</script>

<template>
  <div ref="RegLoginRef" class="reg-login">
    <div v-if="is_reg" class="reg-login__login" @click="handleToReg(false)">
      <span class="text">前往登录</span>
      <i class="iconfont wzry-fanhui" />
    </div>

    <div v-else class="reg-login__reg" @click="handleToReg(true)">
      <i class="iconfont wzry-fanhui" />
      <span class="text">返回注册</span>
    </div>

    <!-- 组件切换 -->
    <RegBox v-if="is_reg" @success="onRegSuccess" />
    <LoginBox v-else />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

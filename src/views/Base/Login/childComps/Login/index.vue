<script setup lang="ts">
import { ref, computed, onMounted, onBeforeMount } from "vue";

import LoginBox from "./childComps/LoginBox/index.vue"; //登录盒子
import RegBox from "./childComps/RegBox/index.vue"; //注册盒子
import SelectInto from "./childComps/SelectInto/index.vue"; //选择进入方式

import settingStore from "@/store/setting";
import switchStore from "@/store/switch";
import { $Parallax, $throttleInstant } from "@/utils";

const $settingStore = settingStore();
const $switchStore = switchStore();

const loginBox = ref<HTMLElement>();

const IMGBED = window.IMGBED; //全局图床链接

const is_reg = ref(""); //注册及登录状态下要显示的输入框及按钮
const fn = ref(); //移动事件

const component = computed(() => {
  return is_reg.value === "登录"
    ? LoginBox
    : is_reg.value === "注册"
    ? RegBox
    : SelectInto;
});

/* 重新选择 */
const handleBack = () => {
  is_reg.value = "";
  $switchStore.$clickAudio("p60v");
};

/* 进入方式 */
const EmitIntoType = (v: string) => {
  is_reg.value = v;
};

onMounted(() => {
  const parallax = new $Parallax(
    ({ degX, degY }: Record<string, number>) => {
      loginBox.value &&
        (loginBox.value.style.transform = `rotateX(${degX}deg) rotateY(${degY}deg)`);
    },
    {
      rx: 10,
      ry: 10,
    }
  );

  fn.value = (e: MouseEvent) => {
    $throttleInstant(() => {
      parallax.move(e);
    }, 10);
  };

  window.addEventListener("mousemove", fn.value);
});

onBeforeMount(() => {
  window.removeEventListener("mousemove", fn.value);
});
</script>

<template>
  <div ref="loginBox" class="login-box">
    <div
      v-show="is_reg"
      class="back cursor-pointer lib-click"
      @click="handleBack"
    >
      <i class="iconfont wzry-fanhui" />
      <span>重新选择</span>
    </div>
    <div
      v-particle="{
        down: true,
        filter: false,
        color: '#e8cc7d',
        enable: $settingStore.config.particle,
      }"
      class="logo"
    >
      <img :src="IMGBED + '/image/login_logo.png'" alt="logo" />
    </div>
    <div class="title">
      {{ is_reg === "" ? "注册 | 登录" : "欢迎" + is_reg }}
    </div>
    <div v-if="!is_reg" class="select-into"></div>
    <component
      :is="component"
      @into="EmitIntoType"
      @success="is_reg = '登录'"
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

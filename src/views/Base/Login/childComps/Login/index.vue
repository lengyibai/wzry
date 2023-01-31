<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from "vue";

import LoginBox from "./childComps/LoginBox/index.vue"; //登录盒子
import RegBox from "./childComps/RegBox/index.vue"; //注册盒子
import SelectInto from "./childComps/SelectInto/index.vue"; //选择进入方式

import { $Parallax, $throttleInstant } from "@/utils";
import { userList } from "@/api/main/user";
import settingStore from "@/store/setting";
import switchStore from "@/store/switch";

const $settingStore = settingStore();
const $switchStore = switchStore();

const IMGBED = window.IMGBED; //全局图床链接

const loginBox = ref<HTMLElement>();
const is_reg = ref(""); //注册及登录状态下要显示的输入框及按钮
const reg_form = ref<User>(); //用户表单

userList().then((res) => {
  if (res.length) is_reg.value = "登录";
});

//登录、注册的组件切换
const component = computed(() => {
  return is_reg.value === "登录" ? LoginBox : is_reg.value === "注册" ? RegBox : SelectInto;
});

/* 重新选择登录还是注册 */
const handleBack = () => {
  is_reg.value = "";
  $switchStore.$clickAudio("p60v");
};

/**
 * @description: 进入方式，用于切换注册和登录组件
 * @param {string} v 注册或登录
 */
const EmitIntoType = (v: string) => {
  is_reg.value = v;
};

/**
 * @description: 注册成功
 * @param {User} form 注册成功的表单
 */
const EmitRegSuccess = (form: User) => {
  is_reg.value = "登录";
  reg_form.value = form;
};

/* 视差动画 */
const parallax = new $Parallax(
  ({ degX, degY }: Record<string, number>) => {
    loginBox.value &&
      (loginBox.value.style.transform = `translate(-50%, -50%) rotateX(${degX}deg) rotateY(${degY}deg)`);
  },
  {
    rx: 10,
    ry: 10,
  }
);
const fn1 = (e: MouseEvent) => {
  $throttleInstant(() => parallax.move(e), 50);
};
const fn2 = (e: TouchEvent) => {
  $throttleInstant(() => parallax.move(e.changedTouches[0]), 50);
};
window.addEventListener("mousemove", fn1);
window.addEventListener("touchmove", fn2);

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", fn1);
  window.removeEventListener("touchmove", fn2);
});
</script>

<template>
  <div ref="loginBox" class="login-box">
    <!-- 左上角重新选择 -->
    <div v-show="is_reg" class="back cursor-pointer lib-click" @click="handleBack">
      <i class="iconfont wzry-fanhui" />
      <span>重新选择</span>
    </div>

    <!-- logo -->
    <div
      v-particle="{
        down: true,
        filter: false,
        color: '#e8cc7d',
        lock: true,
        enable: $settingStore.config.particle,
      }"
      class="logo"
    >
      <img :src="IMGBED + '/image/login_logo.png'" alt="logo" @dragstart.prevent />
    </div>

    <!-- 标题 -->
    <div class="title">
      {{ is_reg === "" ? "WELCOME" : "欢迎" + is_reg }}
    </div>

    <!-- 组件切换 -->
    <component
      :is="component"
      :user-info="reg_form"
      @into="EmitIntoType"
      @success="EmitRegSuccess"
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

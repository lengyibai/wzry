<script setup lang="ts">
import { ref, computed } from "vue";

import Login from "./childComps/Login/index.vue"; //登录盒子
import Notice from "./childComps/Notice/index.vue"; //公告
import ToolBar from "./childComps/ToolBar/index.vue"; //工具栏

import { LOGINBG } from "@/config/assets";
import useGetData from "@/hooks/useGetData";
import settingStore from "@/store/setting";

const $settingStore = settingStore();

const IMGBED = window.IMGBED; //全局图床链接

const show_notice = ref(true); //是否显示公告

const enable_video_bg = computed(() => $settingStore.config.videoBg);

useGetData();

const EmitToolType = (v: string) => {
  if (v === "notice") {
    show_notice.value = true;
  }
};
</script>

<template>
  <div class="login">
    <div class="logo">
      <img :src="IMGBED + '/image/logo.png'" alt="" />
    </div>

    <Login />
    <ToolBar @clicks="EmitToolType" />
    <LibBgVideo
      v-if="enable_video_bg"
      :video="LOGINBG"
      :muted="!$settingStore.config.loginSound"
    />
    <img v-else class="login-bg" :src="IMGBED + '/image/login_bg.png'" alt="" />

    <transition name="fade">
      <Notice v-if="show_notice" v-model="show_notice" />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

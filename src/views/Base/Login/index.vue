<script setup lang="ts">
import { ref, computed } from "vue";

import Login from "./childComps/Login/index.vue"; //登录盒子
import Notice from "./childComps/Notice/index.vue"; //公告
import ToolBar from "./childComps/ToolBar/index.vue"; //工具栏
import DownLoad from "./childComps/DownLoad/index.vue"; //下载数据

import { LOGINBG } from "@/config/assets";
import settingStore from "@/store/setting";

const $settingStore = settingStore();

const IMGBED = window.IMGBED; //全局图床链接

const show_notice = ref(true); //是否显示公告
const finish = ref(false); //是否下完数据完成

const enable_video_bg = computed(() => $settingStore.config.videoBg);

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
    <transition name="fade">
      <Login v-if="finish && !show_notice" />
    </transition>

    <ToolBar @clicks="EmitToolType" />
    <LibBgVideo
      v-if="enable_video_bg"
      :video="LOGINBG"
      :muted="!$settingStore.config.loginSound"
    />
    <img v-else class="login-bg" :src="IMGBED + '/image/login_bg.png'" alt="" />

    <transition v-if="finish" name="fade">
      <Notice v-if="show_notice" v-model="show_notice" />
    </transition>

    <transition name="fade">
      <DownLoad v-if="!finish" v-model:finish="finish" />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

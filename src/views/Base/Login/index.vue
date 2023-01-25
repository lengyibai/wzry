<script setup lang="ts">
import { ref, computed } from "vue";

import Login from "./childComps/Login/index.vue"; //登录盒子
import Notice from "./childComps/Notice/index.vue"; //公告
import ToolBar from "./childComps/ToolBar/index.vue"; //工具栏
import DownLoad from "./childComps/DownLoad/index.vue"; //下载数据

import { LOGINBG } from "@/config/assets";
import switchStore from "@/store/switch";
import settingStore from "@/store/setting";

const $settingStore = settingStore();
const $switchStore = switchStore();

const IMGBED = window.IMGBED; //全局图床链接
let tip_status = false; //用于tip新手引导

const show_notice = ref(true); //显示公告
const finish = ref(false); //数据下载完成

//启用视频背景
const enable_video_bg = computed(() => $settingStore.config.videoBg);

$switchStore.$loading.close();

/**
 * @description: 点击右上角工具栏
 * @param {string} v 点击工具栏的静音或公告按钮类型
 */
const EmitToolType = (v: string) => {
  v === "notice" && (show_notice.value = true);
};

/** @description: 关闭公告触发 */
const EmitCloseNotice = () => {
  if (tip_status) return;
  $switchStore.$tip({ text: "9f5m" });
  tip_status = true;
};
</script>

<template>
  <div class="login">
    <div class="logo">
      <img :src="IMGBED + '/image/logo.png'" alt="" @dragstart.prevent />
    </div>

    <!-- 登录盒子 -->
    <transition name="login">
      <Login v-if="finish && !show_notice" />
    </transition>

    <!-- 工具栏 -->
    <ToolBar :notice="finish" @clicks="EmitToolType" />

    <!-- 视频背景 -->
    <LibBgVideo v-if="enable_video_bg" :video="LOGINBG" :muted="$settingStore.config.muted" />

    <!-- 图片 -->
    <img v-else class="login-bg" :src="IMGBED + '/image/login_bg.png'" alt="" />

    <!-- 公告 -->
    <transition v-if="finish" name="fade">
      <Notice v-if="show_notice" v-model="show_notice" @update:model-value="EmitCloseNotice" />
    </transition>

    <!-- 下载进度 -->
    <transition name="fade">
      <DownLoad v-if="!finish" v-model:finish="finish" />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

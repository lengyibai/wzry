<script setup lang="ts">
import { ref, computed, onUnmounted } from "vue";

import RegLogin from "./childComps/RegLogin/index.vue"; //登录盒子
import Notice from "./childComps/Notice/index.vue"; //公告
import ReadMe from "./childComps/ReadMe/index.vue"; //README
import Todo from "./childComps/Todo/index.vue"; //计划
import Team from "./childComps/Team/index.vue"; //开黑
import ToolBar from "./childComps/ToolBar/index.vue"; //工具栏
import DownLoad from "./childComps/DownLoad/index.vue"; //下载数据

import $bus from "@/utils/eventBus";
import switchStore from "@/store/switch";
import settingStore from "@/store/setting";

const $settingStore = settingStore();
const $switchStore = switchStore();

const IMGBED = window.IMGBED; //全局图床链接
let tip_status = false; //用于tip新手引导

const show_notice = ref(true); //显示公告
const show_readme = ref(false); //显示README
const show_todo = ref(false); //显示计划
const show_team = ref(false); //显示开黑
const finish = ref(false); //数据下载完成

//启用视频背景
const enable_video_bg = computed(() => $settingStore.config.videoBg);

/**
 * 点击右上角工具栏
 * @param v 点击工具栏的静音、README、公告按钮类型
 */
const EmitToolType = (v: string) => {
  show_readme.value = v === "readme";
  show_notice.value = v === "notice";
  show_team.value = v === "team";
  show_todo.value = v === "todo";
};

/* 关闭公告触发 */
const EmitCloseNotice = () => {
  if (tip_status) return;
  $switchStore.$tip({ text: "9f5m" });
  tip_status = true;
};

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

onUnmounted(() => {
  $bus.off("resize");
});
</script>

<template>
  <div class="login">
    <div class="logo" @touchstart="handleStartTime" @touchend="handleEndTime">
      <img :src="IMGBED + '/image/logo.png'" alt="" @dragstart.prevent />
    </div>

    <!-- 登录注册盒子 -->
    <RegLogin v-if="finish" :class="{ hide: !finish || show_notice || show_todo || show_team }" />

    <!-- 工具栏 -->
    <ToolBar :notice="finish" @clicks="EmitToolType" />

    <!-- 视频背景 -->
    <K-Video v-if="enable_video_bg" :video="IMGBED + '/video/login_bg.mp4'" :muted="$settingStore.config.muted" />

    <!-- 图片 -->
    <img v-else class="login-bg" :src="IMGBED + '/image/login_bg.png'" alt="" />

    <!-- 公告 -->
    <transition v-if="finish" name="fade">
      <Notice v-if="show_notice" v-model="show_notice" @close="EmitCloseNotice" />
    </transition>

    <!-- README -->
    <transition name="fade">
      <ReadMe v-if="show_readme" v-model="show_readme" />
    </transition>

    <!-- 计划 -->
    <transition name="fade">
      <Todo v-if="show_todo" v-model="show_todo" />
    </transition>

    <!-- 开黑 -->
    <transition name="fade">
      <Team v-if="show_team" v-model="show_team" />
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

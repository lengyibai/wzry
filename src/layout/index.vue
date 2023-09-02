<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

import { Util } from "@/utils";
import Sidebar from "@/layout/childComps/Sidebar/index.vue";
import Navbar from "@/layout/childComps/Navbar/index.vue";
import AppMain from "@/layout/childComps/AppMain/index.vue";
import Footbar from "@/layout/childComps/Footbar/index.vue";
import { SettingStore, AudioStore } from "@/store";

const $settingStore = SettingStore();
const $audioStore = AudioStore();

const IMGBED = window.IMGBED;

/** 显示侧边栏 */
const show_sidebar = ref(false);
/** 显示导航栏 */
const show_navbar = ref(false);
/** 显示底部栏 */
const show_footbar = ref(false);
/** 显示主体页面 */
const show_appmain = ref(false);

const enable_video_bg = computed(() => $settingStore.config.videoBg);

onMounted(async () => {
  $audioStore.play("p53r");

  await Util.TOOL.promiseTimeout(() => {
    show_sidebar.value = true;
  }, 500);
  await Util.TOOL.promiseTimeout(() => {
    show_navbar.value = true;
  }, 500);
  await Util.TOOL.promiseTimeout(() => {
    show_appmain.value = true;
  }, 500);
  await Util.TOOL.promiseTimeout(() => {
    show_footbar.value = true;
  }, 500);
});
</script>

<template>
  <div class="layout">
    <!-- 侧边栏 -->
    <transition name="sidebar">
      <Sidebar v-if="show_sidebar" />
    </transition>

    <!-- 右侧主体 -->
    <div class="layout-container">
      <!-- 导航栏 -->
      <transition name="navbar">
        <Navbar v-if="show_navbar" />
      </transition>

      <!-- 主页面 -->
      <transition name="app-main">
        <AppMain v-if="show_appmain" />
      </transition>

      <!-- 底部导航栏 -->
      <transition name="footbar">
        <Footbar v-if="show_footbar" />
      </transition>
    </div>
    <K-Video v-if="enable_video_bg" :video="IMGBED + '/video/bg.mp4'" />

    <!-- 图片壁纸 -->
    <img v-else class="layout-bg" :src="IMGBED + '/image/background.png'" alt="" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

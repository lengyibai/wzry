<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";

import BarrageMain from "@/layout/components/BarrageMain/index.vue";
import Sidebar from "@/layout/components/Sidebar/index.vue";
import Navbar from "@/layout/components/Navbar/index.vue";
import AppMain from "@/layout/components/AppMain/index.vue";
import Footbar from "@/layout/components/Footbar/index.vue";
import { AudioStore, BarrageStore } from "@/store";
import { $concise, $tool } from "@/utils";
import { KVideo } from "@/components/business";
import { useGetData } from "@/hooks";

const $audioStore = AudioStore();
const $barrageStore = BarrageStore();

const { status } = storeToRefs($barrageStore);

useGetData().getData(true);

const { getVideoLink } = $concise;

/** 显示侧边栏 */
const show_sidebar = ref(false);
/** 显示导航栏 */
const show_navbar = ref(false);
/** 显示底部栏 */
const show_foot_bar = ref(false);
/** 显示主体页面 */
const show_app_main = ref(false);

onMounted(async () => {
  $audioStore.play("p53r");

  await $tool.promiseTimeout(() => {
    show_sidebar.value = true;
  }, 1000);
  await $tool.promiseTimeout(() => {
    show_navbar.value = true;
  }, 500);
  await $tool.promiseTimeout(() => {
    show_app_main.value = true;
  }, 500);
  await $tool.promiseTimeout(() => {
    show_foot_bar.value = true;
  }, 500);
});
</script>

<template>
  <div class="layout">
    <!-- 弹幕 -->
    <teleport v-if="status" to="body">
      <BarrageMain />
    </teleport>

    <!-- 侧边栏 -->
    <Sidebar v-if="show_sidebar" />

    <!-- 右侧主体 -->
    <div class="layout-container">
      <!-- 导航栏 -->
      <Navbar v-if="show_navbar" />

      <!-- 主页面 -->
      <AppMain v-if="show_app_main" />

      <!-- 底部导航栏 -->
      <Footbar v-if="show_foot_bar" />
    </div>

    <!-- 视频背景 -->
    <KVideo :link="getVideoLink('bg')" muted />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

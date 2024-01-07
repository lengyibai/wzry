<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";

import BarrageMain from "@/layout/childComps/BarrageMain/index.vue";
import Sidebar from "@/layout/childComps/Sidebar/index.vue";
import Navbar from "@/layout/childComps/Navbar/index.vue";
import AppMain from "@/layout/childComps/AppMain/index.vue";
import FootBar from "@/layout/childComps/FootBar/index.vue";
import { AudioStore, BarrageStore } from "@/store";
import { $concise, $tool } from "@/utils";
import { KVideo } from "@/components/business";
import { useGetData } from "@/hooks";

const $audioStore = AudioStore();

const { status } = storeToRefs(BarrageStore());

useGetData();

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
  }, 500);
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
    <transition name="sidebar">
      <Sidebar v-if="show_sidebar" />
    </transition>

    <!-- 右侧主体 -->
    <div class="layout__container">
      <!-- 导航栏 -->
      <transition name="navbar">
        <Navbar v-if="show_navbar" />
      </transition>

      <!-- 主页面 -->
      <transition name="app-main">
        <AppMain v-if="show_app_main" />
      </transition>

      <!-- 底部导航栏 -->
      <transition name="foot-bar">
        <FootBar v-if="show_foot_bar" />
      </transition>
    </div>
    <KVideo :link="getVideoLink('bg')" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

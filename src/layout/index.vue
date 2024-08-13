<script setup lang="ts">
import { ref, onMounted } from "vue";

import { useBarrages } from "./components/BarrageMain/hooks/useBarrages";

import BarrageMain from "@/layout/components/BarrageMain/index.vue";
import Sidebar from "@/layout/components/Sidebar/index.vue";
import Navbar from "@/layout/components/Navbar/index.vue";
import AppMain from "@/layout/components/AppMain/index.vue";
import Footbar from "@/layout/components/Footbar/index.vue";
import { KVideo } from "@/components/business";
import { _promiseTimeout } from "@/utils/tool";
import { _getVideoLink } from "@/utils/concise";
import { useStaticResourceVersion } from "@/hooks";

const { status } = useBarrages();
const { video_home_version } = useStaticResourceVersion();

/** 显示侧边栏 */
const show_sidebar = ref(false);
/** 显示导航栏 */
const show_navbar = ref(false);
/** 显示底部栏 */
const show_foot_bar = ref(false);
/** 显示主体页面 */
const show_app_main = ref(false);

onMounted(async () => {
  await _promiseTimeout(1000);
  show_sidebar.value = true;

  await _promiseTimeout(500);
  show_navbar.value = true;

  await _promiseTimeout(500);
  show_app_main.value = true;

  await _promiseTimeout(500);
  show_foot_bar.value = true;
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
    <KVideo
      v-if="video_home_version"
      style="filter: brightness(0.75)"
      :link="_getVideoLink('bg', video_home_version)"
      muted
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

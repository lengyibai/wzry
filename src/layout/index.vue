<template>
  <div class="layout">
    <transition name="sidebar">
      <Sidebar v-if="show_sidebar" />
    </transition>
    <div class="layout-container">
      <transition name="navbar">
        <Navbar v-if="show_navbar" />
      </transition>
      <transition name="appMain">
        <AppMain v-if="show_appMain" />
      </transition>
      <transition name="footbar">
        <Footbar v-if="show_footbar" />
      </transition>
    </div>
    <LibBgVideo :video="video" />
    <!-- parallaxSize="small" -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Sidebar from '@/layout/childComps/Sidebar/index.vue'; //侧边栏
import Navbar from '@/layout/childComps/Navbar/index.vue'; //顶部栏
import AppMain from '@/layout/childComps/AppMain/index.vue'; //路由视图
import Footbar from '@/layout/childComps/Footbar/index.vue'; //底部栏

const show_sidebar = ref(false);
const show_navbar = ref(false);
const show_footbar = ref(false);
const show_appMain = ref(false);
const video = new URL('../assets/video/bg.mp4', import.meta.url).href;

onMounted(() => {
  setTimeout(() => {
    show_sidebar.value = true;
    show_navbar.value = true;
    show_footbar.value = true;
    show_appMain.value = true;
  }, 500);
});
</script>
<style scoped lang="less">
.sidebar-leave-active,
.sidebar-enter-active,
.navbar-leave-active,
.navbar-enter-active,
.footbar-leave-active,
.footbar-enter-active,
.appMain-leave-active,
.appMain-enter-active {
  transition: all 0.5s;
}

.layout {
  display: flex;
  width: 100vw;
}
.layout-container {
  flex: 1;
  height: 100vh;
}

/* 侧边栏动画 */
.sidebar-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}
.sidebar-leave-to {
  opacity: 0;
}

/* 顶部栏动画 */
.navbar-enter-from {
  opacity: 0;
  transform: translateY(-100%);
}
.navbar-leave-to {
  opacity: 0;
}
/* 底部栏动画 */
.footbar-enter-from {
  opacity: 0;
  transform: translateY(100%);
}
.footbar-leave-to {
  opacity: 0;
}
/* 路由视图动画 */
.appMain-enter-from {
  opacity: 0;
}
.appMain-leave-to {
  opacity: 0;
}
</style>

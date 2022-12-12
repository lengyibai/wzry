<template>
  <div class="layout">
    <transition name="sidebar">
      <Sidebar v-if="show_sidebar" />
    </transition>
    <div class="layout-container">
      <transition name="navbar">
        <Navbar v-if="show_navbar" />
      </transition>
      <transition name="app-main">
        <AppMain v-if="show_appmain" />
      </transition>
      <transition name="footbar">
        <Footbar v-if="show_footbar" />
      </transition>
    </div>
    <LibBgVideo :video="BG" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { BG } from "@/config/assets";
import Sidebar from "@/layout/childComps/Sidebar/index.vue"; //侧边栏
import Navbar from "@/layout/childComps/Navbar/index.vue"; //顶部栏
import AppMain from "@/layout/childComps/AppMain/index.vue"; //路由视图
import Footbar from "@/layout/childComps/Footbar/index.vue"; //底部栏

const show_sidebar = ref(false); //显示侧边栏
const show_navbar = ref(false); //显示导航栏
const show_footbar = ref(false); //显示底部栏
const show_appmain = ref(false); //显示主体页面

onMounted(() => {
  setTimeout(() => {
    show_sidebar.value = true;
    show_navbar.value = true;
    show_footbar.value = true;
    show_appmain.value = true;
  }, 500);
});
</script>
<style scoped lang="less">
@import url("./index.less");
</style>

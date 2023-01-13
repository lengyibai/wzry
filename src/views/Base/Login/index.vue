<script setup lang="ts">
import { ref } from "vue";
import { LOGINBG } from "@/config/assets";
import settingStore from "@/store/setting";
import Login from "./childComps/Login/index.vue"; //登录盒子
import Notice from "./childComps/Notice/index.vue"; //公告
import ToolBar from "./childComps/ToolBar/index.vue"; //工具栏

const $settingStore = settingStore();

const show_notice = ref(true); //是否显示公告

const EmitToolType = (v: string) => {
  if (v === "notice") {
    show_notice.value = true;
  }
};
</script>

<template>
  <div class="login">
    <div class="logo">
      <img
        src="https://lengyibai.gitee.io/img-bed/wzry/image/logo.png"
        alt=""
      />
    </div>

    <ToolBar @clicks="EmitToolType" />
    <Login />
    <LibBgVideo :video="LOGINBG" :muted="!$settingStore.config.loginSound" />
    <Notice v-model="show_notice" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

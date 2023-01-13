<script setup lang="ts">
import { ref } from "vue";
import { LOGINBG } from "@/config/assets";
import Login from "./childComps/Login/index.vue"; //登录盒子
import Notice from "./childComps/Notice/index.vue"; //公告
import ToolBar from "./childComps/ToolBar/index.vue"; //工具栏

const show_notice = ref(true); //是否显示公告
const muted = ref(false); //是否静音

const EmitToolType = (v: string) => {
  if (v === "sound") {
    muted.value = !muted.value;
  } else if (v === "notice") {
    show_notice.value = true;
  }
};
</script>

<template>
  <div class="login">
    <div class="logo">
      <img
        src="https://lengyibai.gitee.io/wzry-material/image/logo.png"
        alt=""
      />
    </div>

    <ToolBar @clicks="EmitToolType" />
    <Login />
    <LibBgVideo :video="LOGINBG" :muted="muted" />
    <Notice v-model="show_notice" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

<script setup lang="ts">
import { ref } from "vue";
import { LOGINBG } from "@/config/assets";
import Login from "./childComp/Login/index.vue"; //登录盒子
import LoginUpdate from "./childComp/LoginUpdate/index.vue"; //公告

const show_KDialog = ref(true); //是否显示公告
</script>

<template>
  <div class="login">
    <div class="logo">
      <img
        src="https://lengyibai.gitee.io/wzry-material/image/logo.png"
        alt=""
      />
    </div>

    <Login />
    <LibBgVideo :video="LOGINBG" />
    <LoginUpdate v-model="show_KDialog" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

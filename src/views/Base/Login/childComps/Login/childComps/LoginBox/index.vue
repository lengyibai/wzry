<script setup lang="ts">
import { ref } from "vue";

import IntoBtn from "../IntoBtn/index.vue";

import RememberPwd from "./childComps/RememberPwd/index.vue";

import authStore from "@/store/auth";

const form = ref({ id: "", password: "" });
const remember = ref(true);

const local_user = localStorage.getItem("remember_user");

if (local_user) {
  form.value = JSON.parse(local_user);
}

/* 登录 */
const handleLogin = () => {
  authStore().login(form.value);
  if (remember.value) {
    localStorage.setItem("remember_user", JSON.stringify(form.value));
  } else {
    localStorage.removeItem("remember_user");
  }
};
</script>

<template>
  <div class="log-box">
    <div class="box">
      <i class="iconfont wzry-user" />
      <input v-model="form.id" type="text" placeholder="请输入帐号" />
    </div>

    <div class="box">
      <i class="iconfont wzry-password" />
      <input v-model="form.password" type="text" placeholder="请输入密码" />
    </div>

    <!-- 记住密码 -->
    <div class="remember">
      <RememberPwd v-model="remember" />
    </div>

    <div class="btns">
      <IntoBtn text="登录" desc="LOGIN" @click="handleLogin" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

<script setup lang="ts">
import { ref } from "vue";

import IntoBtn from "../IntoBtn/index.vue";

import RememberPwd from "./childComps/RememberPwd/index.vue";

import { existEmpty } from "@/utils";
import authStore from "@/store/auth";
import switchStore from "@/store/switch";

const $switchStore = switchStore();
const $authStore = authStore();

const form = ref({ id: "", password: "" });
const remember = ref(true);

const local_user = localStorage.getItem("remember_user");

if (local_user) {
  form.value = JSON.parse(local_user);
}

/* 登录 */
const handleLogin = () => {
  if (existEmpty(form.value)) {
    $switchStore.$msg("请完整填写", "error");
    return;
  }
  $authStore.login(form.value);
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
      <K-Input v-model="form.id" placeholder="请输入帐号" />
    </div>

    <div class="box">
      <i class="iconfont wzry-password" />
      <K-Input
        v-model="form.password"
        placeholder="请输入密码"
        type="password"
      />
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

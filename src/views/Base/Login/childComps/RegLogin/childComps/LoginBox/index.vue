<script setup lang="ts">
import { ref } from "vue";

import IntoBtn from "../IntoBtn/index.vue"; //登录/注册按钮

import RememberPwd from "./childComps/RememberPwd/index.vue"; //记住密码

import { userDefaultInfo } from "@/default";
import { $existEmpty } from "@/utils";
import authStore from "@/store/auth";
import switchStore from "@/store/switch";

interface Props {
  userInfo: User; //注册成功后用于填充
}
const props = defineProps<Props>();

const $switchStore = switchStore();
const $authStore = authStore();

const form = ref({ ...userDefaultInfo, id: "123456", password: "lengyibai" });
const remember = ref(true);

const local_user = localStorage.getItem("remember_user");

if (props.userInfo) {
  form.value = props.userInfo;
} else if (local_user) {
  form.value = JSON.parse(local_user);
}

/* 登录 */
const handleLogin = () => {
  if ($existEmpty(form.value, ["id", "password"])) {
    $switchStore.$msg("请完整填写", "error");
    return;
  }

  $authStore
    .login(form.value)
    .then(() => {
      $switchStore.$clickAudio("e84n");
      $switchStore.$msg("登录成功");
      //记住密码
      if (remember.value) {
        localStorage.setItem("remember_user", JSON.stringify(form.value));
      } else {
        localStorage.removeItem("remember_user");
      }
    })
    .catch((err) => {
      $switchStore.$msg(err, "error");
    });
};
</script>

<template>
  <div class="log-box">
    <!-- 帐号 -->
    <div class="box">
      <i class="iconfont wzry-user" />
      <K-Input v-model.number="form.id" width="100%" padding-left="45px" placeholder="请输入帐号" name="id" required />
    </div>

    <!-- 密码 -->
    <div class="box">
      <i class="iconfont wzry-password" />
      <K-Input
        v-model="form.password"
        width="100%"
        padding-left="45px"
        placeholder="请输入密码"
        type="password"
        required
      />
    </div>

    <!-- 记住密码 -->
    <div class="remember">
      <RememberPwd v-model="remember" />
    </div>

    <!-- 登录 -->
    <div class="btns">
      <IntoBtn text="登录" desc="LOGIN" @click="handleLogin" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

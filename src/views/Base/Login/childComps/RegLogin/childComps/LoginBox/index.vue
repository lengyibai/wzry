<script setup lang="ts">
import { ref } from "vue";

import IntoBtn from "../IntoBtn/index.vue";

import RememberPwd from "./childComps/RememberPwd/index.vue";

import { userDefaultInfo } from "@/default";
import { AudioStore, AuthStore } from "@/store";
import { $message, $tool } from "@/utils";
import { CONFIG } from "@/config";

interface Props {
  /** 注册成功后用于填充 */
  userInfo: User;
}

const $props = defineProps<Props>();

const $audioStore = AudioStore();
const $authStore = AuthStore();

/** 用于登录后禁用按钮 */
let is_login = false;

/** 是否记住密码 */
const remember = ref(true);
const form = ref({ ...userDefaultInfo(), id: "123456", password: "lengyibai" });

const local_user = localStorage.getItem(CONFIG.LOCAL_KEY.REMEMBER_USER);

if ($props.userInfo) {
  form.value = $props.userInfo;
} else if (local_user) {
  form.value = JSON.parse(local_user);
}

/* 登录 */
const handleLogin = () => {
  if ($tool.existEmpty(form.value, ["id", "password"])) {
    $message("请完整填写", "error");
    return;
  }

  if (is_login) return;
  is_login = true;
  $authStore
    .login(form.value)
    .then(() => {
      $audioStore.play("e84n");
      $message("登录成功");
      if (remember.value) {
        localStorage.setItem(CONFIG.LOCAL_KEY.REMEMBER_USER, JSON.stringify(form.value));
      } else {
        localStorage.removeItem(CONFIG.LOCAL_KEY.REMEMBER_USER);
      }
    })
    .catch(() => {
      is_login = false;
    });
};
</script>

<template>
  <div class="log-box">
    <!-- 帐号 -->
    <div class="log-box__box">
      <i class="iconfont wzry-user" />
      <K-Input
        v-model.number="form.id"
        width="100%"
        padding-left="2.8125rem"
        placeholder="请输入帐号"
        name="id"
        required
      />
    </div>

    <!-- 密码 -->
    <div class="log-box__box">
      <i class="iconfont wzry-password" />
      <K-Input
        v-model="form.password"
        width="100%"
        padding-left="2.8125rem"
        placeholder="请输入密码"
        type="password"
        required
      />
    </div>

    <!-- 记住密码 -->
    <div class="log-box__remember">
      <RememberPwd v-model="remember" />
    </div>

    <!-- 登录 -->
    <div class="log-box__btns">
      <IntoBtn text="登录" desc="LOGIN" @click="handleLogin" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

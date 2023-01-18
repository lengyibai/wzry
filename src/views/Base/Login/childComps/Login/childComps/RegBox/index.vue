<script setup lang="ts">
import { reactive } from "vue";

import IntoBtn from "../IntoBtn/index.vue"; //按钮

import RoleSelect from "./childComps/RoleSelect/index.vue"; //权限选择

import { register } from "@/api/main/user";
import switchStore from "@/store/switch";
import { existEmpty } from "@/utils";

interface Emits {
  (e: "success"): void;
}
const emit = defineEmits<Emits>();

const $switchStore = switchStore();

const form = reactive<User>({
  id: "",
  headImg: IMGBED + "/image/head.jpg",
  nickname: "",
  password: "",
  role: 1,
});

/* 注册 */
const handleReg = () => {
  if (existEmpty(form)) {
    $switchStore.$msg("请完整填写", "error");
    return;
  }
  register(form)
    .then(() => {
      $switchStore.$msg("注册成功！");
      emit("success");
    })
    .catch(() => {
      $switchStore.$msg("用户已存在，请直接登录", "warning");
    });
};
</script>

<template>
  <div class="reg-box">
    <div class="box">
      <i class="iconfont wzry-nickname" />
      <K-Input v-model="form.nickname" placeholder="请输入昵称" />
    </div>

    <div class="box">
      <i class="iconfont wzry-user" />
      <K-Input v-model="form.id" placeholder="请输入帐号" />
    </div>

    <div class="box">
      <i class="iconfont wzry-password" />
      <K-Input v-model="form.password" placeholder="请输入密码" />
    </div>

    <RoleSelect v-model="form.role" :option="['管理员', '用户']" />
    <div class="btns">
      <IntoBtn text="注册" desc="REGISTER" @click="handleReg" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

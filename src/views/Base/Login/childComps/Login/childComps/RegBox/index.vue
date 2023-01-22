<script setup lang="ts">
import { reactive } from "vue";

import IntoBtn from "../IntoBtn/index.vue"; //按钮

import RoleSelect from "./childComps/RoleSelect/index.vue"; //权限选择

import { register } from "@/api/main/user";
import { userDefaultInfo } from "@/defaultValue";
import { $existEmpty } from "@/utils";
import switchStore from "@/store/switch";

interface Emits {
  (e: "success", form: User): void;
}
const emit = defineEmits<Emits>();

const $switchStore = switchStore();

// 表单数据
const form = reactive<User>({ ...userDefaultInfo });

/* 注册 */
const handleReg = () => {
  // 非空判断
  if ($existEmpty(form)) {
    $switchStore.$msg("请完整填写", "error");
    return;
  }

  // 注册
  register(form)
    .then(() => {
      $switchStore.$msg("注册成功！");
      emit("success", form);
    })
    .catch((err) => {
      $switchStore.$msg(err, "warning");
    });
};
</script>

<template>
  <div class="reg-box">
    <!-- 昵称 -->
    <div class="box">
      <i class="iconfont wzry-nickname" />
      <K-Input v-model="form.nickname" placeholder="请输入昵称" />
    </div>

    <!-- 帐号 -->
    <div class="box">
      <i class="iconfont wzry-user" />
      <K-Input v-model="form.id" placeholder="请输入帐号" />
    </div>

    <!-- 密码 -->
    <div class="box">
      <i class="iconfont wzry-password" />
      <K-Input v-model="form.password" placeholder="请输入密码" />
    </div>

    <!-- 权限选择 -->
    <RoleSelect
      v-model="form.role"
      class="role-select"
      :option="['管理员', '用户']"
    />

    <!-- 注册 -->
    <div class="btns">
      <IntoBtn text="注册" desc="REGISTER" @click="handleReg" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

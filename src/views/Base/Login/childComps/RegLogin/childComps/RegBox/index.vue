<script setup lang="ts">
import { ref, reactive } from "vue";

import IntoBtn from "../IntoBtn/index.vue"; //按钮

import RoleSelect from "./childComps/RoleSelect/index.vue"; //权限选择

import { userDefaultInfo } from "@/default";
import { API_USER } from "@/api";
import { $message } from "@/config";
import { AudioStore } from "@/store";

interface Emits {
  (e: "success", form: User): void;
}
const emit = defineEmits<Emits>();

const $audioStore = AudioStore();

const form = reactive<User>({ ...userDefaultInfo }); //表单数据

const form_verify = ref<boolean[]>([false, false, false]); //表单验证

/* 注册 */
const handleReg = () => {
  $audioStore.play("36jn");

  if (form_verify.value.some((item) => !item)) {
    $message("请正确填写", "error");
    return;
  }

  //注册
  API_USER.register(form)
    .then(() => {
      $message("注册成功！");
      emit("success", form);
    })
    .catch((err) => {
      $message(err, "warning");
    });
};
</script>

<template>
  <div class="reg-box">
    <!-- 昵称 -->
    <div class="box">
      <i class="iconfont wzry-nickname" />
      <K-Input
        v-model:empty="form_verify[0]"
        v-model="form.nickname"
        :max="6"
        :min="2"
        padding-left="2.8125rem"
        placeholder="请输入昵称"
        required
        width="100%"
      />
    </div>

    <!-- 帐号 -->
    <div class="box">
      <i class="iconfont wzry-user" />
      <K-Input
        v-model:empty="form_verify[1]"
        v-model.number="form.id"
        :max="12"
        :min="6"
        number
        padding-left="2.8125rem"
        placeholder="请输入帐号"
        required
        width="100%"
      />
    </div>

    <!-- 密码 -->
    <div class="box">
      <i class="iconfont wzry-password" />
      <K-Input
        v-model:empty="form_verify[2]"
        v-model="form.password"
        :max="18"
        :min="6"
        padding-left="2.8125rem"
        placeholder="请输入密码"
        required
        width="100%"
      />
    </div>

    <!-- 权限选择 -->
    <RoleSelect v-model="form.role" class="role-select" :option="[$t('管理员'), $t('用户')]" />

    <!-- 注册 -->
    <div class="btns">
      <IntoBtn :text="$t('注册')" desc="REGISTER" @click="handleReg" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

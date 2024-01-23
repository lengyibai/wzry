<script setup lang="ts">
import { ref, reactive } from "vue";

import IntoBtn from "../IntoBtn/index.vue";

import RoleSelect from "./components/RoleSelect/index.vue";

import { userDefaultInfo } from "@/default";
import { LOCAL_USER } from "@/api";
import { AudioStore } from "@/store";
import { $message } from "@/utils";
import { KInput } from "@/components/business";

const $emit = defineEmits<{
  success: [form: Global.User];
}>();

const $audioStore = AudioStore();

/** 表单数据 */
const form = reactive<Global.User>({ ...userDefaultInfo() });
/** 表单验证 */
const form_verify = ref<boolean[]>([false, false, false]);

/* 注册 */
const handleReg = () => {
  $audioStore.play("pj83");

  if (form_verify.value.some((item) => !item)) {
    $message("请正确填写", "error");
    return;
  }

  //注册
  LOCAL_USER.register(form)
    .then(() => {
      $message("注册成功！");
      $emit("success", form);
    })
    .catch((err) => {
      $message(err, "warning");
    });
};
</script>

<template>
  <div class="reg-box">
    <!-- 昵称 -->
    <div class="reg-box__box">
      <i class="iconfont wzry-nickname" />
      <KInput
        v-model:empty="form_verify[0]"
        v-model="form.nickname"
        :max="6"
        :min="2"
        placeholder="请输入昵称"
        required
      />
    </div>

    <!-- 帐号 -->
    <div class="reg-box__box">
      <i class="iconfont wzry-user" />
      <KInput
        v-model:empty="form_verify[1]"
        v-model.number="form.id"
        :max="12"
        :min="6"
        number
        placeholder="请输入帐号"
        required
      />
    </div>

    <!-- 密码 -->
    <div class="reg-box__box">
      <i class="iconfont wzry-password" />
      <KInput
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
    <RoleSelect v-model="form.role" class="reg-box__role-select" :option="['管理员', '用户']" />

    <!-- 注册 -->
    <div class="reg-box__btns">
      <IntoBtn text="注册" desc="REGISTER" @click="handleReg" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

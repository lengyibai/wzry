<script setup lang="ts">
import { ref, reactive } from "vue";

import IntoBtn from "../IntoBtn/index.vue"; //按钮

import RoleSelect from "./childComps/RoleSelect/index.vue"; //权限选择

import { register } from "@/api/main/user";
import { userDefaultInfo } from "@/default";
import switchStore from "@/store/switch";

interface Emits {
  (e: "success", form: User): void;
}
const emit = defineEmits<Emits>();

const $switchStore = switchStore();

const form = reactive<User>({ ...userDefaultInfo }); //表单数据

const form_verify = ref<boolean[]>([false, false, false]); //表单验证

/* 注册 */
const handleReg = () => {
  $switchStore.$clickAudio("36jn");

  if (form_verify.value.some((item) => !item)) {
    $switchStore.$msg("请正确填写", "error");
    return;
  }

  //注册
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
      <K-Input
        v-model="form.nickname"
        v-model:empty="form_verify[0]"
        padding-left="45px"
        placeholder="请输入昵称"
        required
        :min="2"
        :max="6"
      />
    </div>

    <!-- 帐号 -->
    <div class="box">
      <i class="iconfont wzry-user" />
      <K-Input
        v-model.number="form.id"
        v-model:empty="form_verify[1]"
        padding-left="45px"
        placeholder="请输入帐号"
        required
        number
        :min="6"
        :max="12"
      />
    </div>

    <!-- 密码 -->
    <div class="box">
      <i class="iconfont wzry-password" />
      <K-Input
        v-model="form.password"
        v-model:empty="form_verify[2]"
        padding-left="45px"
        placeholder="请输入密码"
        required
        :min="6"
        :max="18"
      />
    </div>

    <!-- 权限选择 -->
    <RoleSelect v-model="form.role" class="role-select" :option="['管理员', '用户']" />

    <!-- 注册 -->
    <div class="btns">
      <IntoBtn text="注册" desc="REGISTER" @click="handleReg" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

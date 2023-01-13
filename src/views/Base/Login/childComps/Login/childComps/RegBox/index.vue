<script setup lang="ts">
import { reactive } from "vue";
import { register } from "@/api/main/user";
import switchStore from "@/store/globalSwitch";
import IntoBtn from "../IntoBtn/index.vue"; //按钮
import RoleSelect from "./childComps/RoleSelect/index.vue"; //权限选择

interface Emits {
  (e: "success"): void;
}
const emit = defineEmits<Emits>();

const $switchStore = switchStore();

const form = reactive<User>({
  id: "",
  headImg: "https://lengyibai.gitee.io/img-bed/wzry/image/head.jpg",
  nickname: "",
  password: "",
  role: 1,
});

/* 注册 */
const handleReg = () => {
  register(form)
    .then(() => {
      $switchStore.$tip("注册成功！");
      emit("success");
    })
    .catch(() => {
      $switchStore.$tip("用户已存在，请直接登录", "error");
    });
};
</script>

<template>
  <div class="reg-box">
    <div class="box">
      <i class="iconfont wzry-nickname" />
      <input type="text" v-model="form.nickname" placeholder="请输入昵称" />
    </div>

    <div class="box">
      <i class="iconfont wzry-user" />
      <input type="text" v-model="form.id" placeholder="请输入帐号" />
    </div>

    <div class="box">
      <i class="iconfont wzry-password" />
      <input type="text" v-model="form.password" placeholder="请输入密码" />
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

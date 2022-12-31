<script setup lang="ts">
import { reactive, ref } from "vue";
import { ACCOUNT } from "@/config/config";
import LoginBtn from "./childComps/LoginBtn/index.vue";
import authStore from "@/store/auth";

// type Toggle = Record<string, Record<string, boolean>>;

//表单
const form = reactive({
  id: ACCOUNT,
  password: "lengyibai.",
});
//注册及登录状态下要显示的输入框及按钮
const show = ref<Record<string, boolean>>({
  account: true,
  password: true,
  phone: false,
  msgcode: false,
  nickname: false,
  log: true,
  reg: false,
});

/* 登录与注册切换 */
// const toggle = (status: string) => {
//   const obj: Toggle = {
//     a: {
//       account: true,
//       password: true,
//       nickname: false,
//       log: true,
//       reg: false,
//     },
//     b: {
//       account: false,
//       password: false,
//       nickname: false,
//       log: true,
//       reg: false,
//     },
//     c: {
//       account: true,
//       password: true,
//       nickname: true,
//       log: false,
//       reg: true,
//     },
//   };

//   show.value = obj[status];
// };

/* 登录 */
const handleLogin = () => {
  authStore().login(form);
};
</script>

<template>
  <div class="login-box">
    <img
      src="https://lengyibai.gitee.io/wzry-material/image/login_logo.png"
      alt="logo"
      class="logo"
    />
    <div class="title">欢迎{{ show.reg ? "注册" : "登录" }}</div>
    <div class="box">
      <div class="nickname" v-if="show.nickname">
        <i class="iconfont wzry-nickname" />
        <input type="text" placeholder="请输入昵称" />
      </div>
      <div class="account" v-if="show.account">
        <i class="iconfont wzry-user" />
        <input type="text" v-model.number="form.id" placeholder="请输入帐号" />
      </div>
      <div class="password" v-if="show.password">
        <i class="iconfont wzry-password" />
        <input type="text" v-model="form.password" placeholder="请输入密码" />
      </div>
    </div>
    <div class="btns">
      <LoginBtn @click="handleLogin" />
      <!-- <div class="log" v-if="show.log">登录</div>
      <div class="reg" v-if="show.reg">注册</div> -->
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

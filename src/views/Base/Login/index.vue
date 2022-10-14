<template>
  <div class="Login">
    <div class="logo">
      <img src="@/assets/img/other/logo.png" alt="" />
    </div>
    <h1>王者荣耀后台管理系统</h1>
    <input type="text" v-model="form.id" />
    <input type="password" v-model="form.password" />

    <LoginBtn @click="login" />
    <LibBgVideo video="/video/loginBg.mp4" />
    <LoginUpdate v-model="show_KDialog" />
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import authStore from '@/store/auth';
import switchStore from '@/store/globalSwitch';
import LoginBtn from './childComp/LoginBtn/index.vue';
import LoginUpdate from './childComp/LoginUpdate/index.vue';

const $router = useRouter();
const $switchStore = switchStore();

const show_KDialog = ref(true); //是否显示公告

/* 表单 */
const form = reactive({
  id: 1329670984,
  password: 'lengyibai.',
});

/* 登录 */
const login = async () => {
  $switchStore.$loading.show('登录中');
  $switchStore.$clickAudio('login');
  await authStore().login(form);
  await $switchStore.$loading.close();
  $router.push('/');
};
</script>
<style scoped lang="less">
@import './index.less';
</style>

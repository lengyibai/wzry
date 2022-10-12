<template>
  <div class="Login">
    <div class="logo">
      <img src="@/assets/img/other/logo.png" alt="" />
    </div>
    <h1>王者荣耀后台管理系统</h1>
    <input type="text" v-model="form.id" />
    <input type="password" v-model="form.password" />

    <LoginBtn @click="login" />
    <LibBgVideo :video="video" />
    <LoginUpdate v-model="show_KDialog" />
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import switchStore from '@/store/globalSwitch.js';
import authStore from '@/store/auth.js';
import LoginBtn from './childComp/LoginBtn/index.vue';
import LoginUpdate from './childComp/LoginUpdate/index.vue';

const $router = useRouter();
const $switchStore = switchStore();

const video = new URL('../../../assets/video/loginBg.mp4', import.meta.url).href;

const show_KDialog = ref(true);
const form = reactive({
  id: 1329670984,
  password: 'lengyibai.',
});

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

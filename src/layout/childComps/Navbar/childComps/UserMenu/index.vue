<template>
  <div class="user-menu">
    <img
      class="head-img"
      v-if="userInfo.headImg"
      :src="userInfo.headImg"
      alt="头像"
    />
    <div class="user-card">
      <div class="name lib-one-line">{{ timeGreet }}，{{ userInfo.name }}</div>
      <div class="role">身份：{{ role }}</div>

      <div class="btns">
        <div class="edit">
          <K-Button fontSize="20px" autoSize>编辑个人信息</K-Button>
        </div>
        <div class="logout" @click="logout">
          <K-Button type="error" fontSize="20px" autoSize>退出登录</K-Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { $timeGreet } from "@/utils";
import authStore from "@/store/auth";
import switchStore from "@/store/globalSwitch";

const $authStore = authStore();
const $switchStore = switchStore();

const timeGreet = computed(() => $timeGreet());
const userInfo = computed(() => {
  return $authStore.userInfo;
});
const role = computed(() => {
  return userInfo.value.role === 0 ? "管理员" : "普通用户";
});

/* 退出登录 */
const logout = async () => {
  $switchStore.$clickAudio();
  $switchStore.$loading.show("正在退出");
  await $authStore.logout();
  await $switchStore.$loading.close();
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>

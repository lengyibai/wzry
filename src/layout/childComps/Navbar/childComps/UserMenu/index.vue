<template>
  <div class="user-menu cursor-pointer">
    <LibFlipBox>
      <template #front>
        <div class="user cursor-pointer">
          <img v-if="userInfo.headImg" :src="userInfo.headImg" alt="" />
          <span>{{ timeGreet }}，{{ userInfo.name }}</span>
        </div>
      </template>
      <template #back>
        <K-Button @click="logout" type="error" :autoSize="true">退出登录</K-Button>
      </template>
    </LibFlipBox>
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

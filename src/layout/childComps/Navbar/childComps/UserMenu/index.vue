<template>
  <div class="UserMenu cursor-pointer">
    <LibFlipBox>
      <template #front>
        <div class="user cursor-pointer">
          <img v-if="userInfo.headImg" :src="userInfo.headImg" alt />
          <span>{{ timeGreet }}，{{ userInfo.name }}</span>
        </div>
      </template>
      <template #back>
        <K-Button @click="logout" type="error" :autoSize="true">退出登录</K-Button>
      </template>
    </LibFlipBox>
  </div>
</template>
<script setup>
//#####··········公共方法··········#####//
//方法信息：{ 根据时间问候 }
import { computed } from 'vue';
import { $timeGreet } from '@/utils/index.js';
import authStore from '@/store/auth.js';
import switchStore from '@/store/globalSwitch.js';

const $authStore = authStore();
const $switchStore = switchStore();
const userInfo = computed(() => {
  return $authStore.userInfo;
});
const timeGreet = computed(() => $timeGreet());
const logout = async () => {
  $switchStore.$loading.show('正在退出');
  $switchStore.$clickAudio();
  await $switchStore.$loading.close();
  $authStore.logout();
};
</script>
<style scoped lang="less">
.UserMenu {
  width: 240px;
  height: 100%;
  .user {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      height: 75%;
      border-radius: 50%;
      margin-left: 15px;
    }
    span {
      font-size: 20px;
      color: var(--theme-color-five);
      margin-right: 15px;
    }
  }
}
</style>

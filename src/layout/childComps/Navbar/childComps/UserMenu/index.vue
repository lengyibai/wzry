<script setup lang="ts">
import { ref, computed } from "vue";

import Options from "./childComps/Options/index.vue";

import { $timeGreet } from "@/utils";
import authStore from "@/store/auth";
import switchStore from "@/store/switch";

const $authStore = authStore();
const $switchStore = switchStore();

const IMGBED = window.IMGBED; //全局图床链接

const show_menu = ref(false); //显示用户菜单
const show_edit = ref(false); //显示编辑个人信息弹窗
const show_close = ref(false); //显示确认保存弹窗
const show_logoff = ref(false); //显示确认注销弹窗
const edit_status = ref(false); //信息是否修改
const time_greet = ref(""); //问候

const userInfo = computed(() => $authStore.userInfo); //用户本地信息
const role = computed(() => {
  return user_info.value.role === 0 ? "管理员" : "普通用户";
}); //用户权限

const user_info = ref<Partial<User>>({ ...userInfo.value }); //编辑的用户信息

/* 编辑个人信息 */
const handleEditInfo = () => {
  show_edit.value = true;
};

/* 退出登录 */
const handleLogout = async () => {
  $switchStore.$clickAudio("36jn");
  $switchStore.$loading.show("正在退出");
  await $switchStore.$loading.close();
  $authStore.logout();
};

/* 注销账号 */
const handleLogoff = async () => {
  $switchStore.$loading.show("正在注销");
  await $switchStore.$loading.close();
  $authStore.logoff();
};

/* 显示确认关闭弹窗 */
const EmitClose = () => {
  if (edit_status.value) {
    show_close.value = true;
  } else {
    show_edit.value = false;
  }
};

/* 问候语 */
time_greet.value = $timeGreet();
setInterval(() => {
  time_greet.value = $timeGreet();
}, 1000);
</script>

<template>
  <div
    class="user-menu"
    :class="{ hover: show_menu }"
    @mouseenter="show_menu = true"
    @mouseleave="show_menu = false"
  >
    <img
      class="head-img"
      :src="userInfo.headImg || IMGBED + '/image/unknown.png'"
      alt="头像"
    />
    <div class="user-card">
      <div class="name lib-one-line">
        {{ time_greet }}，{{ userInfo.nickname }}
      </div>
      <div class="role">身份：{{ role }}</div>

      <div class="btns">
        <div class="edit">
          <K-Button font-size="20px" auto-size @click="handleEditInfo"
            >编辑个人信息</K-Button
          >
        </div>
        <div class="logout" @click="handleLogout">
          <K-Button type="warning" font-size="20px" auto-size
            >退出登录</K-Button
          >
        </div>
        <div class="logoff" @click="show_logoff = true">
          <K-Button type="error" font-size="20px" auto-size>注销帐号</K-Button>
        </div>
      </div>
    </div>
  </div>
  <transition name="fade">
    <K-Dialog
      v-if="show_edit"
      title="编辑个人资料"
      width="920px"
      up
      @close="EmitClose"
    >
      <Options
        :id="$authStore.userInfo.id"
        v-model:status="edit_status"
        @close="show_edit = false"
      />
    </K-Dialog>
  </transition>

  <!-- 注销确认 -->
  <transition name="fade">
    <ConfirmClose
      v-if="show_logoff"
      v-model="show_logoff"
      text="注销后，当前帐号需重新注册才能登录，确定注销吗？"
      @confirm="handleLogoff"
    />
  </transition>

  <!-- 关闭设置弹窗确认 -->
  <transition name="fade">
    <ConfirmClose
      v-if="show_close"
      v-model="show_close"
      text="资料未保存，确定关闭吗？"
      @confirm="show_edit = false"
    />
  </transition>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

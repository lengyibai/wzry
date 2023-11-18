<script setup lang="ts">
import { ref, computed } from "vue";

import { AuthStore, AudioStore } from "@/store";
import { $bus, $concise } from "@/utils";
import { EditUserInfo, KButton, KDialog } from "@/components/business";

const $authStore = AuthStore();
const $audioStore = AudioStore();

const { getImgLink } = $concise;

/** 离开定时器 */
let timer: NodeJS.Timeout;

/** 显示用户菜单 */
const show_menu = ref(false);
/** 显示编辑个人信息弹窗 */
const show_edit = ref(false);
/** 信息是否修改 */
const edit_status = ref(false);
/** 编辑的用户信息 */
const user_info = ref<Partial<User>>({ ...$authStore.userInfo });

/** 用户本地信息 */
const userInfo = computed(() => $authStore.userInfo);
/** 用户权限 */
const role = computed(() => {
  return user_info.value.role === 0 ? "管理员" : "普通用户";
});
/* 悬浮显示 */
const handleEnter = () => {
  show_menu.value = true;
  clearTimeout(timer);
};

/* 离开隐藏 */
const handleLeave = () => {
  timer = setTimeout(() => {
    show_menu.value = false;
  }, 500);
};

/* 编辑个人信息 */
const handleEditInfo = () => {
  show_edit.value = true;
};

/* 退出登录 */
const handleLogout = () => {
  $audioStore.play("36jn");
  $authStore.logout();
};

/* 注销账号确认 */
const handleConfirmLogoff = () => {
  $bus.emit("confirm", {
    text: "注销后，当前帐号需重新注册才能登录，确定注销吗？",
    confirm: handleLogoff,
  });
};

/* 注销账号 */
const handleLogoff = async () => {
  $authStore.logoff();
};

/* 显示确认关闭弹窗 */
const onCloseConfirmEdidInfo = () => {
  if (edit_status.value) {
    $bus.emit("confirm", {
      text: "资料已修改，确定关闭吗？",
      confirm: () => {
        show_edit.value = false;
      },
    });
  } else {
    show_edit.value = false;
  }
};
</script>

<template>
  <div
    class="user-menu"
    :class="{ hover: show_menu }"
    @mouseenter="handleEnter"
    @mouseleave="handleLeave"
  >
    <img
      class="head-img"
      :src="userInfo.headImg || getImgLink('unknown')"
      alt="头像"
      @touchend="show_menu = !show_menu"
    />
    <div class="user-card">
      <div class="name">{{ userInfo.nickname }}</div>
      <div class="role">身份：{{ role }}</div>

      <div class="btns">
        <KButton class="k-button" @click="handleEditInfo">编辑个人信息</KButton>
        <KButton class="k-button" type="warning" @click="handleLogout">退出登录</KButton>
        <KButton class="k-button" type="error" @click="handleConfirmLogoff">注销帐号</KButton>
      </div>
    </div>
  </div>

  <teleport to="body">
    <transition name="fade">
      <KDialog
        v-if="show_edit"
        title="编辑个人信息"
        width="57.5rem"
        up
        @close="onCloseConfirmEdidInfo"
      >
        <EditUserInfo
          :id="$authStore.userInfo.id"
          v-model:status="edit_status"
          @close="show_edit = false"
        />
      </KDialog>
    </transition>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

<script setup lang="ts">
import { ref, computed, reactive } from "vue";

import EditUserInfo from "./components/EditUserInfo/index.vue";

import { AuthStore, AudioStore } from "@/store";
import { $concise, $confirm } from "@/utils";
import { KButton, KDialog } from "@/components/business";
import { vDelayHide, vMouseTip } from "@/directives";
import { MOUSE_TIP } from "@/config";

const $authStore = AuthStore();
const $audioStore = AudioStore();

const { getImgLink } = $concise;

const dialogRef = ref<InstanceType<typeof KDialog>>();

/** 显示用户菜单 */
const show_menu = ref(false);
/** 显示编辑个人信息弹窗 */
const show_edit = ref(false);
/** 信息是否修改 */
const edit_status = ref(false);
/** 编辑的用户信息 */
const user_info = reactive<Partial<Global.User>>({ ...$authStore.userInfo });

/** 用户本地信息 */
const userInfo = computed(() => $authStore.userInfo);
/** 用户权限 */
const role = computed(() => {
  return user_info.role === 0 ? "管理员" : "普通用户";
});
/* 悬浮显示 */
const handleEnter = () => {
  show_menu.value = true;
};

/* 离开隐藏 */
const handleLeave = () => {
  show_menu.value = false;
};

/* 编辑个人信息 */
const handleEditInfo = () => {
  show_edit.value = true;
};

/* 退出登录 */
const handleLogout = () => {
  $audioStore.play("pj83");
  $authStore.logout();
};

/* 注销账号确认 */
const handleConfirmLogoff = () => {
  $confirm({
    text: "注销后，当前帐号需重新注册才能登录，确定注销吗？",
    confirm: handleLogoff,
  });
};

/* 注销账号 */
const handleLogoff = () => {
  $authStore.logoff();
};

/* 显示确认关闭弹窗 */
const onCloseConfirmEditInfo = () => {
  if (edit_status.value) {
    $confirm({
      text: "资料已修改，确定关闭吗？",
      confirm() {
        dialogRef.value!._close();
      },
    });
  }
};
</script>

<template>
  <div
    v-delay-hide="{
      enter: handleEnter,
      leave: handleLeave,
    }"
    class="user-menu"
    :class="{ hover: show_menu }"
  >
    <img
      v-mouse-tip="{
        text: MOUSE_TIP.c2y9,
      }"
      class="head-img"
      :src="userInfo.avatar || getImgLink('unknown')"
      alt="头像"
      @touchend="show_menu = !show_menu"
    />
    <div class="user-card">
      <div class="name">{{ userInfo.nickname }}</div>
      <div class="role">身份：{{ role }}</div>

      <div class="btns">
        <KButton
          v-mouse-tip="{
            text: MOUSE_TIP.c3x1,
          }"
          class="k-button"
          @click="handleEditInfo"
        >
          编辑个人信息
        </KButton>
        <KButton
          v-mouse-tip="{
            text: MOUSE_TIP.cl81,
          }"
          class="k-button"
          type="warning"
          @click="handleLogout"
        >
          退出登录
        </KButton>
        <KButton
          v-mouse-tip="{
            text: MOUSE_TIP.dz56,
          }"
          class="k-button"
          type="error"
          @click="handleConfirmLogoff"
        >
          注销帐号
        </KButton>
      </div>
    </div>
  </div>

  <teleport to="body">
    <KDialog
      v-if="show_edit"
      ref="dialogRef"
      v-model="show_edit"
      :auto-close="!edit_status"
      title="编辑个人信息"
      width="57.5rem"
      up
      @close="onCloseConfirmEditInfo"
    >
      <EditUserInfo
        v-if="dialogRef"
        :id="$authStore.userInfo.id"
        v-model:status="edit_status"
        @close="dialogRef!._close"
      />
    </KDialog>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
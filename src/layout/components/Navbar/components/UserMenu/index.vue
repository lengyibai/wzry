<script setup lang="ts">
import { ref, computed } from "vue";

import EditUserInfo from "./components/EditUserInfo/index.vue";

import { AuthStore, AudioStore } from "@/store";
import { $confirm, $privateTool } from "@/utils";
import { KButton, KDialog } from "@/components/business";
import { vDelayHide, vMouseTip } from "@/directives";
import { MOUSE_TIP } from "@/config";
import { getImgLink } from "@/utils/modules/concise";

const $authStore = AuthStore();
const $audioStore = AudioStore();

const dialogRef = ref<InstanceType<typeof KDialog>>();

/** 显示用户菜单 */
const show_menu = ref(false);
/** 显示编辑个人信息弹窗 */
const show_edit = ref(false);
/** 信息是否修改 */
const edit_status = ref(false);

/** 用户本地信息 */
const user_data = computed(() => $authStore.user_data);
/** 用户权限 */
const role = computed(() => (user_data.value.role === 0 ? "管理员" : "普通用户"));

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

/* 退卡 */
const handleExitCard = () => {
  $audioStore.play("pj83");
  $privateTool.exportCard(user_data.value);

  $confirm({
    text: "退卡会销毁当前卡片数据，请确保你已经下载了卡片，确定退卡吗？",
    confirm: $authStore.exitCard,
  });
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
      class="head-img"
      :src="user_data.avatar || getImgLink('unknown')"
      alt="头像"
      @touchend="show_menu = !show_menu"
    />
    <div class="user-card">
      <div class="name">{{ user_data.username }}</div>
      <div class="role">身份：{{ role }}</div>

      <div class="btns">
        <KButton
          v-mouse-tip="{
            text: MOUSE_TIP.c3x1,
          }"
          class="k-button"
          @click="handleEditInfo"
        >
          修改个人资料
        </KButton>
        <KButton
          v-mouse-tip="{
            text: MOUSE_TIP.dz56,
          }"
          class="k-button"
          type="error"
          @click="handleExitCard"
        >
          退卡
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
      <EditUserInfo v-if="dialogRef" v-model:status="edit_status" @close="dialogRef!._close" />
    </KDialog>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

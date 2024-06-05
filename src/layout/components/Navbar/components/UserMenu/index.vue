<script setup lang="ts">
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useMediaQuery } from "@vueuse/core";

import EditUserInfo from "./components/EditUserInfo/index.vue";
import UserMarker from "./components/UserMarker/index.vue";

import { AuthStore, KnapsackStore } from "@/store";
import { KButton, KDialog } from "@/components/business";
import { vCopy, vDelayHide, vIdEncipher, vMouseTip } from "@/directives";
import { CONFIRM_TIP, MOUSE_TIP } from "@/config";
import { $confirm } from "@/utils/busTransfer";
import { _exportCard } from "@/utils/privateTool";
import { _formatKilobitNumber } from "@/utils/tool";
import { _getPropLink, _getMiscLink } from "@/utils/concise";

const $authStore = AuthStore();
const $knapsackStore = KnapsackStore();

const { articles } = storeToRefs($knapsackStore);

const under_750 = useMediaQuery("(max-width: 750px)");

const dialogRef = ref<InstanceType<typeof KDialog>>();

/** 显示用户菜单 */
const show_menu = ref(false);
/** 显示编辑个人信息弹窗 */
const show_edit = ref(false);
/** 显示用户使用记录 */
const show_marker = ref(false);
/** 信息是否修改 */
const edit_status = ref(false);

/** 用户本地信息 */
const user_data = computed(() => $authStore.user_data);

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
  $authStore.setSecondaryPassword().then(() => {
    show_edit.value = true;
  });
};

/* 退卡 */
const handleExitCard = () => {
  _exportCard(user_data.value);

  $confirm({
    text: CONFIRM_TIP.wd31,
    confirm() {
      $authStore.exitCard();
    },
  });
};

/* 显示确认关闭弹窗 */
const onCloseConfirmEditInfo = () => {
  if (edit_status.value) {
    $confirm({
      text: CONFIRM_TIP.ah95,
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
      :src="user_data.avatar || _getMiscLink('unknown')"
      alt="头像"
      @touchend="show_menu = !show_menu"
    />
    <div class="user-card">
      <div class="name">{{ user_data.username }}</div>
      <div class="user-id">
        <div v-id-encipher="user_data.id" class="id"></div>
        <i
          v-copy="user_data.id"
          v-mouse-tip="{
            text: MOUSE_TIP.lr80,
          }"
          class="iconfont wzry-fuzhi"
        />
      </div>

      <div v-if="under_750" class="prop-num">
        <div class="prop-item">
          <img class="icon" :src="_getPropLink('gold')" alt="" />
          <div class="num">{{ _formatKilobitNumber(articles.GOLD) }}</div>
        </div>
        <div class="prop-item">
          <img class="icon" :src="_getPropLink('diamond')" alt="" />
          <div class="num">{{ _formatKilobitNumber(articles.DIAMOND) }}</div>
        </div>
      </div>

      <div class="btns">
        <KButton
          v-mouse-tip="{
            text: MOUSE_TIP.kq36,
          }"
          class="k-button"
          @click="show_marker = true"
        >
          个人信息统计
        </KButton>
        <KButton
          v-mouse-tip="{
            text: MOUSE_TIP.c3x1,
          }"
          type="warning"
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
      :ratio="0.75"
      up
      @close="onCloseConfirmEditInfo"
    >
      <div class="edit-user-info-dialog">
        <EditUserInfo v-if="dialogRef" v-model:status="edit_status" @close="dialogRef!._close" />
      </div>
    </KDialog>
  </teleport>

  <UserMarker v-model="show_marker" />
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import SettingDialog from "./components/SettingDialog/index.vue";
import UpdateLog from "./components/UpdateLog/index.vue";
import Mail from "./components/Mail/index.vue";

import { MailStore, VersionStore } from "@/store";
import { MOUSE_TIP, SCENE_TIP } from "@/config";
import { vMouseTip } from "@/directives";
import { $tip, $focus } from "@/utils/busTransfer";

const $versionStore = VersionStore();
const $mailStore = MailStore();

const settingRef = ref<HTMLElement>();

/** 是否显示设置弹窗 */
const show_setting = ref(false);
/** 是否显示日志弹窗 */
const show_update = ref(false);
/** 是否显示邮箱 */
const show_mail = ref(false);

/* 显示更新日志 */
const onUpdateLog = () => {
  $versionStore.setShowLog(true);
};

onMounted(() => {
  setTimeout(() => {
    show_update.value = true;

    $tip({
      text: SCENE_TIP.mu63,
      align: "left-bottom",
      color: false,
      createFn() {
        $focus.show(settingRef.value!);
      },
      btnFn: $focus.close,
    });
  }, 3000);
});
</script>

<template>
  <div class="btn-icon">
    <!-- 邮箱 -->
    <i
      ref="settingRef"
      v-mouse-tip="{
        text: MOUSE_TIP.lq48,
      }"
      class="iconfont wzry-youxiang"
      :class="{
        unread: $mailStore.haveUnread,
      }"
      @click="show_mail = true"
    />
    <!-- 设置 -->
    <i
      ref="settingRef"
      v-mouse-tip="{
        text: MOUSE_TIP.er37,
      }"
      class="iconfont wzry-setting"
      @click="show_setting = true"
    />
    <!-- 任务 -->
    <i
      ref="settingRef"
      v-mouse-tip="{
        text: MOUSE_TIP.nz58,
      }"
      class="iconfont wzry-renwu"
      @click="show_setting = true"
    />
    <!-- 活动 -->
    <i
      ref="settingRef"
      v-mouse-tip="{
        text: MOUSE_TIP.g9u9,
      }"
      class="iconfont wzry-huodong"
      @click="show_setting = true"
    />

    <!-- 邮箱弹窗 -->
    <teleport to="body">
      <Mail v-if="show_mail" v-model="show_mail" />
    </teleport>

    <!-- 设置弹窗 -->
    <teleport to="body">
      <SettingDialog v-if="show_setting" v-model="show_setting" @update-log="onUpdateLog" />
    </teleport>

    <!-- 更新日志 -->
    <teleport to="body">
      <UpdateLog v-if="$versionStore.show_update && show_update" />
    </teleport>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

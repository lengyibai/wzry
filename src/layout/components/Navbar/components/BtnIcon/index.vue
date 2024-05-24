<script setup lang="ts">
import { ref } from "vue";

import SettingDialog from "./components/SettingDialog/index.vue";
import Mail from "./components/Mail/index.vue";
import Task from "./components/Task/index.vue";
import Activity from "./components/Activity/index.vue";
import { useDialogSwitch } from "./hooks/useDialogSwitch";

import { MailStore, TaskStore } from "@/store";
import { MOUSE_TIP } from "@/config";
import { vMouseTip } from "@/directives";
import { useHideLayout } from "@/layout/common/hooks/useHideLayout";

const $mailStore = MailStore();
const $taskStore = TaskStore();

const { setHideStatus } = useHideLayout();
const { show_activity, setActivityShow } = useDialogSwitch();

/** 是否显示设置弹窗 */
const show_setting = ref(false);
/** 是否显示邮箱 */
const show_mail = ref(false);
/** 是否显示任务页 */
const show_task = ref(false);

/** @description 显示任务页 */
const handleTask = () => {
  setHideStatus(true);
  show_task.value = true;
};

/** @description 显示活动页 */
const handleActivity = () => {
  setHideStatus(true);
  setActivityShow(true);
};
</script>

<template>
  <div class="btn-icon">
    <!-- 邮箱 -->
    <i
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
      v-mouse-tip="{
        text: MOUSE_TIP.er37,
      }"
      class="iconfont wzry-setting"
      @click="show_setting = true"
    />
    <!-- 任务 -->
    <i
      v-mouse-tip="{
        text: MOUSE_TIP.nz58,
      }"
      :class="{
        receive: $taskStore.exist_receive,
      }"
      class="iconfont wzry-task"
      @click="handleTask"
    />
    <!-- 活动 -->
    <i
      v-mouse-tip="{
        text: MOUSE_TIP.g9u9,
      }"
      class="iconfont wzry-huodong"
      @click="handleActivity"
    />

    <!-- 邮箱弹窗 -->
    <teleport to="body">
      <Mail v-if="show_mail" v-model="show_mail" />

      <!-- 设置弹窗 -->
      <SettingDialog v-if="show_setting" v-model="show_setting" />
    </teleport>

    <!-- 活动页 -->
    <Activity v-if="show_activity" v-model="show_activity" />

    <!-- 任务页 -->
    <Task v-if="show_task" v-model="show_task" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

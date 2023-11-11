<script setup lang="ts">
import { ref, onMounted } from "vue";

import { VersionStore } from "@/store";
import { SettingDialog, UpdateLog } from "@/components/business";

const $versionStore = VersionStore();

/** 是否显示设置弹窗 */
const show_setting = ref(false);
/** 是否显示日志弹窗 */
const show_update = ref(false);

onMounted(() => {
  setTimeout(() => {
    show_update.value = true;
  }, 3000);
});

/* 控制日志弹窗显示 */
const handleUpdateLog = (v: boolean) => {
  $versionStore.setShowLog(v);
};
</script>

<template>
  <div class="btn-icon">
    <!-- 按钮 -->
    <i class="iconfont wzry-setting" title="设置" @click="show_setting = true" />
    <i class="iconfont wzry-gengxinrizhi" title="更新日志" @click="handleUpdateLog(true)" />

    <!-- 设置弹窗 -->
    <transition name="fade">
      <SettingDialog v-if="show_setting" v-model="show_setting" />
    </transition>

    <!-- 更新日志 -->
    <transition name="fade">
      <UpdateLog v-if="$versionStore.show_update && show_update" @close="handleUpdateLog" />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

<script setup lang="ts">
import { computed } from "vue";

import switchStore from "@/store/switch";
import versionStore from "@/store/version";

const $switchStore = switchStore();
const $versionStore = versionStore();

$switchStore.$clickAudio("u4c5");

const data_status = computed(() => $versionStore.data_status); //数据需要更新
const file_status = computed(() => $versionStore.file_status); //文件需要更新
const update_log = computed(() => $versionStore.update_log); //日志

/* 更新并重启 */
const handleReset = () => {
  $versionStore.updateAll();
};
</script>

<template>
  <K-Dialog
    :show-close="!data_status && !file_status"
    v-bind="$attrs"
    width="960px"
    header="更新日志"
  >
    <div class="main">
      <!-- 页面更新 -->
      <h1>页面更新</h1>
      <div class="content" v-html="update_log.file"></div>

      <!-- 基础数据更新 -->
      <h1 v-if="data_status">基础数据更新</h1>
      <div v-if="data_status" class="content">
        <p v-html="update_log.data"></p>
      </div>

      <!-- 语音更新 -->
      <h1 v-if="data_status">语音更新</h1>
      <div v-if="data_status" class="content">
        <p v-html="update_log.voice"></p>
      </div>
    </div>

    <!-- 重启 -->
    <K-Button v-if="data_status || file_status" type="warning" @click="handleReset"
      >更新并重启</K-Button
    >
  </K-Dialog>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

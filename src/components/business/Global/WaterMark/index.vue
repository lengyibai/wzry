<script setup lang="ts">
import { computed } from "vue";

import { $browserV } from "@/utils";
import collapseStore from "@/store/collapse";
import versionStore from "@/store/version";
import phoneStore from "@/store/phone";

const $collapseStore = collapseStore();
const $versionStore = versionStore();
const $phoneStore = phoneStore();

/* 是否为旧版 */
const old = computed(() => $versionStore.local_version !== $versionStore.remote_version);
const old_file = computed(() => $versionStore.local_file !== $versionStore.file_version);

/* 浏览器版本提示 */
const browser_status = computed(() => $phoneStore.browser_status);
const browser_name = computed(() => $phoneStore.browser_name);
const version = `${$browserV.version} ${
  !browser_status.value ? "(版本较低，部分效果可能无法显示，建议更换浏览器)" : ""
}`;
</script>

<template>
  <transition name="fade">
    <div v-show="!$collapseStore.collapse" class="water-mark">
      <p>帧率：{{ $phoneStore.fps }}</p>
      <p>设备尺寸：{{ $phoneStore.width }}*{{ $phoneStore.height }}</p>
      <p :class="{ low: !browser_status }">浏览器{{ browser_name }}内核版本：{{ version }}</p>
      <p :class="{ old: old }">当前数据版本：{{ $versionStore.local_version }}</p>
      <p :class="{ new: old }">最新数据版本：{{ $versionStore.remote_version }}</p>
      <p :class="{ old: old_file }">当前网页版本：{{ $versionStore.local_file }}</p>
      <p :class="{ new: old_file }">最新网页版本：{{ $versionStore.file_version }}</p>
    </div>
  </transition>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

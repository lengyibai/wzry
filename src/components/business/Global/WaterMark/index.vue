<script setup lang="ts">
import { computed } from "vue";

import { $browserV } from "@/utils";
import collapseStore from "@/store/collapse";
import versionStore from "@/store/version";
import deviceStore from "@/store/device";
import vConsoleStore from "@/store/vConsole";
import authStore from "@/store/auth";

const $collapseStore = collapseStore();
const $versionStore = versionStore();
const $deviceStore = deviceStore();
const $vConsoleStore = vConsoleStore();
const $authStore = authStore();

/* 是否为旧版 */
const old = computed(() => $versionStore.local_version !== $versionStore.remote_version);
const old_file = computed(() => $versionStore.local_file !== $versionStore.file_version);

/* 浏览器版本提示 */
const browser_status = computed(() => $deviceStore.browser_status);
const browser_name = computed(() => $deviceStore.browser_name);
const version = `${$browserV.version} ${
  !browser_status.value ? "(版本较低，部分效果可能无法显示，建议更换浏览器)" : ""
}`;
</script>

<template>
  <div
    :style="{
      opacity: !$collapseStore.collapse || !$authStore.userStatus ? 1 : 0,
    }"
    class="water-mark"
    @touchend="$vConsoleStore.setStatus"
  >
    <p>帧率：{{ $deviceStore.fps }}</p>
    <p>测试尺寸：{{ $deviceStore.width }}*{{ $deviceStore.height }}</p>
    <p :class="{ low: !browser_status }">{{ browser_name }}内核：{{ version }}</p>
    <p :class="{ old: old }">数据：{{ $versionStore.local_version }}</p>
    <p v-if="old" :class="{ new: old }">正在更新数据：{{ $versionStore.remote_version }}</p>
    <p :class="{ old: old_file }">网页：{{ $versionStore.local_file }}</p>
    <p v-if="old_file" :class="{ new: old_file }">登录后更新网页：{{ $versionStore.file_version }}</p>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

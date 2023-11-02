<script setup lang="ts">
import { computed } from "vue";

import { CollapseStore, VersionStore, DeviceStore, AuthStore } from "@/store";
import { $tool } from "@/utils";
import { useGetFps } from "@/hooks";

const $collapseStore = CollapseStore();
const $versionStore = VersionStore();
const $deviceStore = DeviceStore();
const $authStore = AuthStore();

const { fps } = useGetFps();

/* 是否为旧版 */
const old = computed(() => $versionStore.local_version !== $versionStore.remote_version);
const old_file = computed(() => $versionStore.local_file !== $versionStore.file_version);

/* 浏览器版本提示 */
const browser_status = computed(() => $deviceStore.browser_status);
const browser_name = computed(() => $deviceStore.browser_name);
const version = `${$tool.browserV.version} ${
  !browser_status.value ? "(版本较低，部分效果可能无法显示，建议更换浏览器)" : ""
}`;
</script>

<template>
  <div
    :style="{
      opacity: !$collapseStore.collapse || !$authStore.userStatus ? 1 : 0,
    }"
    class="water-mark"
  >
    <p>{{ $t("帧率") }}：{{ fps }}</p>
    <p>{{ $t("屏幕尺寸") }}：{{ $deviceStore.width }}*{{ $deviceStore.height }}</p>
    <p :class="{ low: !browser_status }">{{ browser_name }}{{ $t("内核") }}：{{ version }}</p>
    <p :class="{ old: old }">{{ $t("数据") }}：{{ $versionStore.local_version }}</p>
    <p v-if="old" :class="{ new: old }">{{ $t("正在更新数据") }}：{{ $versionStore.remote_version }}</p>
    <p :class="{ old: old_file }">{{ $t("网页") }}：{{ $versionStore.local_file }}</p>
    <p v-if="old_file" :class="{ new: old_file }">{{ $t("登录后更新") }}：{{ $versionStore.file_version }}</p>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

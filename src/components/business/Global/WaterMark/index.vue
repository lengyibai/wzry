<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";

import { CollapseStore, VersionStore, DeviceStore, AuthStore } from "@/store";
import { $tool } from "@/utils";
import { useGetFps } from "@/hooks";

const $collapseStore = CollapseStore();
const $versionStore = VersionStore();
const $deviceStore = DeviceStore();
const $authStore = AuthStore();

const { data_status, dist_status } = storeToRefs($versionStore);
const { fps } = useGetFps();

/* 浏览器版本提示 */
const browser_status = computed(() => $deviceStore.browser_status);
const browser_name = computed(() => $deviceStore.browser_name);
const version = `${$tool.browserV.version} ${
  !browser_status.value ? "(版本较低，部分效果可能无法显示，建议更换浏览器)" : ""
}`;
</script>

<template>
  <teleport to="body">
    <div
      :style="{
        opacity: !$collapseStore.collapse || !$authStore.userStatus ? 1 : 0,
      }"
      class="water-mark"
    >
      <p
        :class="{
          low: fps < 20,
        }"
      >
        {{ $t("帧率") }}：{{ fps }}
      </p>
      <p>{{ $t("屏幕尺寸") }}：{{ $deviceStore.width }}*{{ $deviceStore.height }}</p>
      <p :class="{ low: !browser_status }">{{ browser_name }}{{ $t("内核") }}：{{ version }}</p>
      <p :class="{ old: data_status }">{{ $t("数据") }}：{{ $versionStore.local_data_version }}</p>
      <p v-if="data_status" :class="{ new: data_status }">
        {{ $t("正在更新数据") }}：{{ $versionStore.remote_data_version }}
      </p>
      <p :class="{ old: dist_status }">{{ $t("网页") }}：{{ $versionStore.local_dist_version }}</p>
      <p v-if="dist_status" :class="{ new: dist_status }">
        {{ $t("登录后更新") }}：{{ $versionStore.remote_dist_version }}
      </p>
    </div>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

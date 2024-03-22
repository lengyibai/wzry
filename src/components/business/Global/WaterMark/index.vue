<script setup lang="ts">
import { computed, ref } from "vue";

import { CollapseStore, DeviceStore, AuthStore, MarkerStore } from "@/store";
import { useGetFps } from "@/hooks";
import { _browserV } from "@/utils/tool";

const $collapseStore = CollapseStore();
const $deviceStore = DeviceStore();
const $authStore = AuthStore();
const $markerStore = MarkerStore();

const { fps } = useGetFps();

/* 浏览器版本提示 */
const browser_status = computed(() => $deviceStore.browser_status);
const browser_name = computed(() => $deviceStore.browser_name);
const version = `${_browserV.version} ${
  !browser_status.value ? "(版本较低，部分效果可能无法显示，建议更换浏览器)" : ""
}`;

const show_markers = ref(false);
//开发模式下按Ctrl + Q切换语言
if (import.meta.env.DEV) {
  document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "z") {
      show_markers.value = !show_markers.value;
    }
  });
}
</script>

<template>
  <teleport to="body">
    <div v-show="show_markers" class="markers">
      <div v-for="(item, index) in $markerStore.marker_num_list" :key="index" class="marker">
        {{ item.key }}-{{ item.label }}：{{ item.value }}
      </div>
    </div>
    <div
      :style="{
        opacity: !$collapseStore.collapse || !$authStore.user_status ? 1 : 0,
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
      <p :class="{ low: !browser_status }">{{ browser_name }}{{ $t("内核") }}：{{ version }}</p>
      <p>{{ $t("屏幕尺寸") }}：{{ $deviceStore.width }}*{{ $deviceStore.height }}</p>
    </div>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

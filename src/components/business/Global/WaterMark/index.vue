<script setup lang="ts">
import { ref } from "vue";
import { useFps } from "@vueuse/core";

import { AuthStore } from "@/store";
import { useDevice } from "@/hooks";
import { _browserV } from "@/utils/tool";
import { useCollapse } from "@/layout/components/Sidebar/hooks/useCollapse";

const $authStore = AuthStore();

const fps = useFps({
  every: 100,
});
const { collapse } = useCollapse();
const { width, height, browser_status, browser_name } = useDevice();

/** 浏览器版本提示 */
const version = `${_browserV.version} ${
  !browser_status ? "(版本较低，部分效果可能无法显示，建议更换浏览器)" : ""
}`;

const show_markers = ref(false);

//开发模式下按Ctrl + M切换语言
if (import.meta.env.DEV) {
  document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "m") {
      show_markers.value = !show_markers.value;
    }
  });
}
</script>

<template>
  <teleport to="body">
    <div
      :style="{
        opacity: !collapse || !$authStore.user_status ? 1 : 0,
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
      <p>{{ $t("屏幕尺寸") }}：{{ width }}*{{ height }}</p>
    </div>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

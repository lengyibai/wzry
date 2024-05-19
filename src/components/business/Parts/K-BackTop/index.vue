<script setup lang="ts">
import { ref } from "vue";

import { MOUSE_TIP } from "@/config";
import { vMouseTip } from "@/directives";

interface Props {
  active: boolean;
}

defineProps<Props>();
const $emit = defineEmits<{
  "back-top": [];
}>();

const backTopRef = ref<HTMLElement>();

/** @description 返回顶部 */
const handleBackTop = () => {
  $emit("back-top");
};
</script>

<template>
  <div
    ref="backTopRef"
    class="k-back-top"
    :class="{
      active: active,
    }"
  >
    <div class="line"></div>
    <i
      v-mouse-tip="{
        text: MOUSE_TIP.yf23,
      }"
      class="iconfont wzry-spider"
      @click="handleBackTop"
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

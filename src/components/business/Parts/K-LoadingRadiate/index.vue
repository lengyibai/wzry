<script setup lang="ts">
import { ref } from "vue";

import { vLazyLoad } from "@/directives";

interface Props {
  /** 图片链接 */
  link: string;
  /** 图片高度 */
  width: string;
  /** 图片宽度 */
  height: string;
  /** 是否圆边 */
  border?: boolean;
}
withDefaults(defineProps<Props>(), {
  border: true,
});

/** 是否显示loading */
const loading = ref(true);

/** @description 加载完成回调 */
const onFinish = () => {
  loading.value = false;
};
</script>

<template>
  <div
    class="k-loading-radiate"
    :style="{ width: width, height: height }"
    :class="{
      border: border,
    }"
  >
    <img
      v-lazy-load="{
        link: link,
        finish: onFinish,
      }"
      alt=""
    />
    <div v-if="loading" class="lines">
      <div v-for="(item, index) in 12" :key="index" class="line" :style="`--i: ${item}`"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

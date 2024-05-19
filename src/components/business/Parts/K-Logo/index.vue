<script setup lang="ts">
import { _getImgLink } from "@/utils/concise";

interface Props {
  /** 是否快速 */
  fast?: boolean;
  /** 是否停止旋转 */
  stop?: boolean;
}
defineProps<Props>();
</script>

<template>
  <div class="k-logo">
    <img
      :src="_getImgLink('logo_inside')"
      alt=""
      class="inside"
      :style="{
        animationDuration: `${fast ? 1 : 6}s!important`,
      }"
      :class="{
        animate: !stop,
      }"
      @dragstart.prevent
    />
    <img
      :src="_getImgLink('logo_outside')"
      alt=""
      class="outside"
      :style="{
        animationDuration: `${fast ? 2 : 12}s!important`,
      }"
      :class="{
        animate: !stop,
      }"
      @dragstart.prevent
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

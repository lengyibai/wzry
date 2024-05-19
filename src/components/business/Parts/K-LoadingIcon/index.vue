<script setup lang="ts">
import { _getImgLink } from "@/utils/concise";

interface Props {
  /** loading宽度 */
  width: string;
  /** loading主题色是否为白色 */
  white?: boolean;
}

withDefaults(defineProps<Props>(), {
  white: false,
});
</script>

<template>
  <div
    class="k-loading-icon"
    :class="{
      white,
    }"
    :style="{
      width: width,
    }"
  >
    <img :src="_getImgLink('logo_inside')" alt="" class="inside" @dragstart.prevent />
    <img :src="_getImgLink('logo_outside')" alt="" class="outside" @dragstart.prevent />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

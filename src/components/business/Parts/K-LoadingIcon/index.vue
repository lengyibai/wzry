<script setup lang="ts">
import { $concise } from "@/utils";

interface Props {
  width: string;
  white?: boolean;
}
withDefaults(defineProps<Props>(), {
  white: false,
});

const { getImgLink } = $concise;
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
    <img :src="getImgLink('logo_inside')" alt="" class="inside" @dragstart.prevent />
    <img :src="getImgLink('logo_outside')" alt="" class="outside" @dragstart.prevent />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

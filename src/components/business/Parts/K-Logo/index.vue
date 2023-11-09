<script setup lang="ts">
import { $concise } from "@/utils";

interface Props {
  fast?: boolean;
  stop?: boolean;
}
defineProps<Props>();

const { getImgLink } = $concise;
</script>

<template>
  <div class="k-logo">
    <img
      :src="getImgLink('logo_inside')"
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
      :src="getImgLink('logo_outside')"
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

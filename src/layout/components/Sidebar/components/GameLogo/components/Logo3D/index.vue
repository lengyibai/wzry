<script setup lang="ts">
import { _getImgLink } from "@/utils/concise";
</script>

<template>
  <div class="logo-3d">
    <div class="logo-box">
      <div v-for="(item, index) in 3" :key="index" class="logo" :class="`logo-${item}`">
        <img :src="_getImgLink('logo_inside')" alt="" class="inside" />
        <img :src="_getImgLink('logo_outside')" alt="" class="outside" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

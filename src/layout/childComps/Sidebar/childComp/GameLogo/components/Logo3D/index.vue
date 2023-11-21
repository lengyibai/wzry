<script setup lang="ts">
import { $concise } from "@/utils";

const { getImgLink } = $concise;
</script>

<template>
  <div class="logo-3d">
    <div class="logo-box">
      <div class="logo-1 logo">
        <img :src="getImgLink('logo_inside')" alt="" class="inside" />
        <img :src="getImgLink('logo_outside')" alt="" class="outside" />
      </div>
      <div class="logo-2 logo">
        <img :src="getImgLink('logo_inside')" alt="" class="inside" />
        <img :src="getImgLink('logo_outside')" alt="" class="outside" />
      </div>
      <div class="logo-3 logo">
        <img :src="getImgLink('logo_inside')" alt="" class="inside" />
        <img :src="getImgLink('logo_outside')" alt="" class="outside" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

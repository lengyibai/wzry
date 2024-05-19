<script setup lang="ts">
import { vTypewriterSingle } from "@/directives";

interface Props {
  /** 皮肤名 */
  name: string;
}
defineProps<Props>();
</script>

<template>
  <div class="hero-skin-name">
    <!-- 用于触发打字机 -->
    <div v-typewriter-single class="skin-name" v-html="name"></div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

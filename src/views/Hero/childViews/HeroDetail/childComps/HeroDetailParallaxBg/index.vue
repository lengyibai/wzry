<template>
  <div
    class="hero-detail-parallax-bg"
    :style="{
      backgroundImage: 'url(' + bg + ')',
    }"
  >
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
interface Props {
  bg: string;
}
withDefaults(defineProps<Props>(), {
  bg: "",
});
</script>
<style scoped lang="less">
@import url("./index.less");
</style>

<script setup lang="ts">
interface Props {
  bg: string;
}
withDefaults(defineProps<Props>(), {
  bg: "",
});
</script>

<template>
  <div
    class="hero-parallax"
    :style="{
      backgroundImage: 'url(' + bg + ')',
    }"
  >
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

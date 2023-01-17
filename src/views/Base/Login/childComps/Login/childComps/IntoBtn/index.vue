<script setup lang="ts">
interface Props {
  text: string;
  desc: string;
}
withDefaults(defineProps<Props>(), {
  text: "",
  desc: "",
});
</script>

<template>
  <button v-particle class="into-btn">
    <span>{{ text }}</span>
    <span>{{ desc }}</span>
  </button>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

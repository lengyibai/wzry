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
  <button class="into-btn" v-particle>
    <span>{{ text }}</span>
    <span>{{ desc }}</span>
  </button>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

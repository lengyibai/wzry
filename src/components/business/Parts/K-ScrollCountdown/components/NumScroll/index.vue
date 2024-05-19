<script setup lang="ts">
interface Props {
  /** 当前位置信息 */
  transform: string;
}
defineProps<Props>();
</script>

<template>
  <div class="num-scroll">
    <div
      class="num-list"
      :style="{
        transform: transform,
      }"
    >
      <div v-for="(_, index) in 10" :key="index" class="num">{{ index }}</div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

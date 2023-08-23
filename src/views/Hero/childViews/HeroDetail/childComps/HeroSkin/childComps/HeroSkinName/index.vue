<script setup lang="ts">
interface Props {
  toggle: boolean; //触发打字机
  name: string; //皮肤名
}
defineProps<Props>();
</script>

<template>
  <div class="hero-skin-name">
    <!-- 用于触发打字机 -->
    <div v-if="toggle && name" key="a" v-typewriterSingle class="skin-name">
      {{ name }}
    </div>
    <div v-if="!toggle && name" key="b" v-typewriterSingle class="skin-name">
      {{ name }}
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

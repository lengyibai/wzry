<script setup lang="ts"></script>

<template>
  <div class="play-area">
    <div class="area-list">
      <div v-for="(item, index) in 12" :key="index" class="area-box"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

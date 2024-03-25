<script setup lang="ts">
import TaskCard from "./components/TaskCard/index.vue";
</script>

<template>
  <div class="task-list">
    <TaskCard v-for="(item, index) in 14" :key="index" :index="item" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

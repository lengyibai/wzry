<script setup lang="ts">
import TaskToolbar from "./components/TaskToolbar/index.vue";
import TaskList from "./components/TaskList/index.vue";

import { vScrollVirtualization } from "@/directives";
</script>

<template>
  <div class="task">
    <!-- 铭文类型分类 -->
    <transition name="epigraph" appear>
      <div class="tool">
        <TaskToolbar />
      </div>
    </transition>

    <!-- 铭文列表 -->
    <div v-scroll-virtualization class="task-main">
      <TaskList />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

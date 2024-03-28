<script setup lang="ts">
import { onActivated, ref } from "vue";

import TaskToolbar from "./components/TaskToolbar/index.vue";
import TaskList from "./components/TaskList/index.vue";

import { vScrollVirtualization } from "@/directives";
import { AudioStore } from "@/store";

defineOptions({
  name: "Task",
});

const $audioStore = AudioStore();

const taskMainRef = ref<HTMLElement>();

/** 当前选择的任务类型 */
const category_index = ref(0);

/* 点击栏目 */
const onCategory = (index: number) => {
  category_index.value = index;
  taskMainRef.value!.scrollTop = 0;
};

onActivated(() => {
  $audioStore.play("kj62");
});
</script>

<template>
  <div class="task">
    <div class="tool">
      <TaskToolbar @change="onCategory" />
    </div>

    <div ref="taskMainRef" v-scroll-virtualization class="task-main">
      <TaskList :tab-index="category_index" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

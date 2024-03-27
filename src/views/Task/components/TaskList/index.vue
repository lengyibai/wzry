<script setup lang="ts">
import { ref, watch } from "vue";
import { computed } from "vue";

import TaskCard from "./components/TaskCard/index.vue";

import { _shuffleArray } from "@/utils/tool";
import { TaskStore } from "@/store";

interface Props {
  /** tab索引 */
  tabIndex: number;
}
const $props = defineProps<Props>();

const $taskStore = TaskStore();

/** 封面列表 */
const task_cover = ref<number[]>([]);

/** 当前任务列表 */
const task_list = computed(() => [$taskStore.today_task_list, $taskStore.week_task_list]);

watch(
  () => $props.tabIndex,
  () => {
    task_cover.value = _shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <div class="task-list">
    <TaskCard
      v-for="(item, index) in task_list[tabIndex]"
      :key="item.id"
      :data="item"
      :index="task_cover[index]"
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

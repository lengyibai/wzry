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

const img_num: number[] = [];

for (let i = 1; i < 51; i++) {
  img_num.push(i);
}

watch(
  () => $props.tabIndex,
  () => {
    task_cover.value = _shuffleArray(img_num);
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <TaskCard
    v-for="(item, index) in task_list[tabIndex]"
    :key="item.id"
    :data="item"
    :index="task_cover[index]"
  />
</template>

<script setup lang="ts">
import { onMounted, provide, ref } from "vue";

import TaskList from "./components/TaskList/index.vue";

import { vMouseTip, vScrollVirtualization } from "@/directives";
import { MOUSE_TIP } from "@/config";
import { useHideLayout } from "@/layout/common/hooks/useHideLayout";
import { usePlayAudio } from "@/hooks";
import { KCategory } from "@/components/business";

/** 是否显示页面 */
const modelValue = defineModel<boolean>({ required: true });

const { playAudio } = usePlayAudio();
const { setHideStatus } = useHideLayout();

/** 任务选项 */
const task_options = ["今日任务", "本周任务"];

const taskMainRef = ref<HTMLElement>();

/** 当前选择的任务类型索引 */
const category_index = ref(0);
/** 是否显示 */
const show = ref(true);

/* 点击栏目 */
const onCategory = (index: number) => {
  category_index.value = index;
  taskMainRef.value!.scrollTop = 0;
};

/* 关闭页面 */
const handleHide = () => {
  show.value = false;
  setHideStatus(false);
  playAudio("p60v");

  setTimeout(() => {
    modelValue.value = false;
  }, 500);
};

onMounted(() => {
  playAudio("kj62");
});

provide("close-task", handleHide);
</script>

<template>
  <teleport to="body">
    <div class="task">
      <!-- 关闭按钮 -->
      <transition name="close" appear>
        <div
          v-show="show"
          v-mouse-tip="{
            text: MOUSE_TIP.mk66,
          }"
          class="close"
          @click="handleHide"
        ></div>
      </transition>

      <transition name="tool" appear>
        <div v-show="show" class="tool-bar">
          <KCategory
            v-model="category_index"
            :auto="false"
            title-width="9.375rem"
            :options="task_options"
            @update:model-value="onCategory"
          />
        </div>
      </transition>

      <transition name="main" appear>
        <div v-show="show" ref="taskMainRef" v-scroll-virtualization class="task-main">
          <TaskList :tab-index="category_index" />
        </div>
      </transition>
    </div>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

<script setup lang="ts">
import { ref } from "vue";

import { vClickOutside, vMouseTip } from "@/directives";
import { usePlayAudio } from "@/hooks";

interface Props {
  /** 下拉列表 */
  options: string[];
  /** 选中的名称 */
  sortText: string;
  /** 列表高度 */
  listHeight?: string;
  /** 最小宽度 */
  minWidth?: string;
}

withDefaults(defineProps<Props>(), {
  listHeight: "initial",
  minWidth: "6.25rem",
});
const $emit = defineEmits<{
  select: [v: number];
}>();

const { playAudio } = usePlayAudio();

/** 选择的值 */
const current_index = ref(-1);
/** 下拉状态 */
const status = ref(false);

/** @description 显示列表
 * @param v 是否展开
 */
const handleDownUp = (v: boolean) => {
  return () => {
    status.value = v;
    v && playAudio("n4r4");
  };
};

/** @description 悬浮触发
 * @param index 悬浮的索引
 */
const handleEnterItem = (index: number) => {
  current_index.value = index;
};

/** @description 选择的值
 * @param index 选择的索引
 */
const handleSelect = (index: number) => {
  status.value = false;
  current_index.value = index;
  $emit("select", index);
  playAudio();
};
</script>

<template>
  <div
    v-mouse-tip
    v-click-outside="{
      inset: handleDownUp(true),
      outside: handleDownUp(false),
    }"
    class="select-filter"
  >
    <div class="title">{{ sortText }}</div>

    <!-- 下拉图标 -->
    <div :class="{ 'arrow-active': status }" class="arrow" />

    <!-- 展开列表 -->
    <div
      class="select-list"
      :class="{ unfold: !status }"
      :style="{ minWidth: minWidth, height: listHeight }"
    >
      <div
        v-for="(item, index) in options"
        :key="item"
        class="box"
        :class="{
          active: current_index === index || sortText === item,
        }"
        @click="handleSelect(index)"
        @mouseenter="handleEnterItem(index)"
        @mouseleave="current_index = -1"
      >
        <div class="item">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

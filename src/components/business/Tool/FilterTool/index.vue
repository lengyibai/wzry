<script setup lang="ts">
import { ref } from "vue";

import { AudioStore } from "@/store";
import { vClickOutside, vMouseTip } from "@/directives";

interface Props {
  /** 下拉列表 */
  data: Global.General<string | number>[];
  /** 列表高度 */
  listHeight?: string;
  /** 选中的名称 */
  sortText: string;
}

withDefaults(defineProps<Props>(), {
  listHeight: "initial",
});
const $emit = defineEmits<{
  select: [v: string | number];
}>();

const $audioStore = AudioStore();

/** 选择的值 */
const current_value = ref("");
/** 下拉状态 */
const status = ref(false);

/* 显示列表 */
const handleDownUp = (v: boolean) => {
  return () => {
    $audioStore.play("n4r4");
    status.value = v;
  };
};

/* 悬浮触发 */
const handleEnterItem = (v: Global.General<string | number>) => {
  current_value.value = v.label;
};

/* 选择的值 */
const handleSelect = (v: Global.General<string | number>) => {
  current_value.value = v.label;
  $emit("select", v.value);
  $audioStore.play();
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
      :style="{ height: listHeight }"
      @click.stop
    >
      <transition-group name="select-list">
        <div
          v-for="item in data"
          :key="item.value"
          class="box"
          :class="{
            active: current_value === item.label || sortText === item.label,
          }"
          @click="handleSelect(item)"
          @mouseenter="handleEnterItem(item)"
          @mouseleave="current_value = ''"
        >
          <div class="item">{{ item.label }}</div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

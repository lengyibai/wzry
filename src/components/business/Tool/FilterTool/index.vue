<script setup lang="ts">
import { ref } from "vue";
import { watch } from "vue";

import { AudioStore } from "@/store";
import { CONFIG } from "@/config";

type Data = { label: string; value: string | number };

interface Props {
  /** 选择的值 */
  modelValue: string;
  /** 下拉列表 */
  data: Data[];
  /** 列表高度 */
  listHeight?: string;
  /** 下拉状态 */
  status: boolean;
}

const $props = withDefaults(defineProps<Props>(), {
  listHeight: "initial",
});
const $emit = defineEmits<{
  select: [v: string | number];
  "update:modelValue": [v: string];
}>();

const $audioStore = AudioStore();

/** 标题 */
const sort_text = ref("默认排序");
/** 选择的值 */
const current_value = ref("");

watch(
  () => $props.modelValue,
  (v) => {
    const data = $props.data.find((item) => v === item.value);
    if (!data) return;
    current_value.value = v;
    sort_text.value = data!.label;
  },
  {
    immediate: true,
  },
);

/* 显示列表 */
const handleShowList = () => {
  $audioStore.play("n4r4");
};

/* 悬浮触发 */
const handleEnterItem = (v: Data) => {
  current_value.value = v.label;
};

/* 选择的值 */
const handleSelect = (v: Data) => {
  current_value.value = v.label;
  sort_text.value = v.label;
  $emit("select", v.value);
  $audioStore.play();
};
</script>

<template>
  <div class="select-filter global_cursor-pointer" @click="handleShowList">
    <div class="title">{{ sort_text }}</div>

    <!-- 下拉图标 -->
    <img
      :class="{ 'arrow-active': status }"
      :src="CONFIG.BASE.IMGBED + '/image/arrow.png'"
      alt="arrow"
      class="arrow"
      @dragstart.prevent
    />

    <!-- 展开列表 -->
    <div class="select-list" :class="{ unfold: !status }" :style="{ height: listHeight }" @click.stop>
      <transition-group name="select-list">
        <button
          v-for="item in data"
          :key="item.value"
          class="box"
          :class="{
            active: current_value === item.label || sort_text === item.label,
          }"
          @mousedown="handleSelect(item)"
          @mouseenter="handleEnterItem(item)"
          @mouseleave="current_value = ''"
        >
          <div class="item">{{ item.label }}</div>
        </button>
      </transition-group>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

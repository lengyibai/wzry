<script setup lang="ts">
import { ref } from "vue";

import { AudioStore } from "@/store";
import { $concise } from "@/utils";

type Data = { label: string; value: string | number };

interface Props {
  /** 下拉列表 */
  data: Data[];
  /** 列表高度 */
  listHeight?: string;
  /** 下拉状态 */
  status: boolean;
  /** 选中的名称 */
  sortText: string;
}

withDefaults(defineProps<Props>(), {
  listHeight: "initial",
});
const $emit = defineEmits<{
  select: [v: string | number];
  "update:modelValue": [v: string];
}>();

const $audioStore = AudioStore();

const { getImgLink } = $concise;

/** 选择的值 */
const current_value = ref("");

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
  $emit("select", v.value);
  $audioStore.play();
};
</script>

<template>
  <div class="select-filter" @click="handleShowList">
    <div class="title">{{ sortText }}</div>

    <!-- 下拉图标 -->
    <img :class="{ 'arrow-active': status }" :src="getImgLink('arrow')" alt="arrow" class="arrow" />

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
          @mousedown="handleSelect(item)"
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

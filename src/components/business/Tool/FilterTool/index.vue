<script setup lang="ts">
import { ref } from "vue";

import switchStore from "@/store/switch";

type Data = { label: string; value: string | number };

interface Props {
  modelValue: string; //选择的值
  data: Data[]; //下拉列表
  listHeight?: string; //列表高度
  status: boolean; //下拉状态
}
const props = withDefaults(defineProps<Props>(), {
  listHeight: "initial",
});

interface Emits {
  (e: "update:modelValue", v: string): void;
  (e: "select", v: any): void;
}
const emit = defineEmits<Emits>();

const $switchStore = switchStore();

const IMGBED = window.IMGBED; //全局图床链接

const sort_text = ref("默认排序"); //标题
const current_value = ref(""); //选择的值

sort_text.value = props.data[0].label;
if (props.modelValue) {
  current_value.value = props.modelValue;
  sort_text.value = props.modelValue;
}

/* 显示列表 */
const handleShowList = () => {
  $switchStore.$clickAudio("n4r4");
};

/* 悬浮触发 */
const handleEnterItem = (v: Data) => {
  current_value.value = v.label;
};

/* 选择的值 */
const handleSelect = (v: { label: string; value: number | string }) => {
  current_value.value = v.label;
  sort_text.value = v.label;
  emit("select", v.value);
  $switchStore.$clickAudio();
};
</script>

<template>
  <div class="select-filter cursor-pointer" @click="handleShowList">
    <div class="title">{{ sort_text }}</div>

    <!-- 下拉图标 -->
    <img
      :class="{ 'arrow-active': status }"
      :src="IMGBED + '/image/arrow.png'"
      alt="arrow"
      class="arrow"
      @dragstart.prevent
    />

    <!-- 展开列表 -->
    <div class="select-list" :class="{ unfold: !status }" :style="{ height: listHeight }" @click.stop>
      <transition-group name="select-list">
        <button
          v-for="item in data"
          class="box"
          :class="{
            active: current_value === item.label || sort_text === item.label,
          }"
          @mousedown="handleSelect(item)"
          @mouseenter="handleEnterItem(item)"
          @mouseleave="current_value = ''"
          :key="item.value"
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

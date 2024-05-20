<script setup lang="ts" generic="T extends Record<string, any>">
import { ref, watch } from "vue";

import { _debounce } from "@/utils/tool";

interface Props {
  data: T[];
}

const $props = defineProps<Props>();

const $emit = defineEmits<{
  "sort-data": [v: T[]];
}>();

/** 是否处于拖拽中 */
const isUpdate = ref(false);
/** 用于交换的数据 */
const arr = ref<T[]>([...$props.data]);
/** 拖拽的元素索引 */
const fromIndex = ref<number | null>(null);
/** 目标位置元素索引 */
const enterIndex = ref<number | null>(null);

/** @description 交换元素
 * @param arr 用于交换元素的数组
 * @param index 索引
 * @param target 目标位置索引
 */
const exchange = (arr: any, index: number, target: number) => {
  if (index > target) {
    arr.splice(target, 0, arr[index]);
    arr.splice(index + 1, 1);
  } else {
    arr.splice(target + 1, 0, arr[index]);
    arr.splice(index, 1);
  }
};

/** @description 拖拽开始触发
 * @param index 拖拽起始索引
 */
const dragstart = (index: number) => {
  fromIndex.value = index;
};

const debounceDrop = _debounce(() => {
  if (fromIndex.value === enterIndex.value) return;
  exchange(arr.value, fromIndex.value!, enterIndex.value!);
  fromIndex.value = enterIndex.value;
  isUpdate.value = true;
}, 100);
/** @description 拖拽到另一个元素上
 * @param index 拖拽目标索引
 */
const dragenter = (index: number) => {
  if (fromIndex.value === null) return;
  enterIndex.value = index;
  debounceDrop();
};

/** @description 拖拽结束 */
const dragend = () => {
  if (isUpdate.value) {
    $emit("sort-data", arr.value as unknown as T[]);
    isUpdate.value = false;
  }
  fromIndex.value = null;
  enterIndex.value = null;
};

watch($props.data, () => {
  (arr.value as T[]) = [...$props.data];
});
</script>

<template>
  <div>
    <transition-group>
      <div
        v-for="(item, index) in arr"
        :key="item.id"
        draggable="true"
        class="box"
        :class="{ active: fromIndex === index }"
        @dragstart="dragstart(index)"
        @dragenter="dragenter(index)"
        @dragend="dragend"
      >
        <slot :item="item" :index="index"></slot>
      </div>
    </transition-group>
  </div>
</template>

<style scoped lang="less">
.box {
  width: 100%;
  transition: 0.25s;

  &.active {
    opacity: 0;
  }
}
</style>

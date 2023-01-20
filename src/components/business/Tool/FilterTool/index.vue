<script setup lang="ts">
import { ref } from "vue";

import switchStore from "@/store/switch";

type Data = { label: string; value: string | number };

interface Props {
  data: Data[];
  listHeight?: string;
}
const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  listHeight: "",
});

interface Emits {
  (e: "update:modelValue", v: string): void;
  (e: "select", v: any): void;
}
const emit = defineEmits<Emits>();

const $switchStore = switchStore();

const IMGBED = window.IMGBED; //全局图床链接

const sort_text = ref("默认排序");
const is_unfold = ref(false);
const currentValue = ref("");

sort_text.value = props.data[0].label;

/* 显示列表 */
const handleShowList = () => {
  is_unfold.value = !is_unfold.value;
  $switchStore.$clickAudio("n4r4");
};

/* 悬浮触发 */
const handleEnterItem = (v: Data) => {
  currentValue.value = v.label;
  $switchStore.$clickAudio("n4r4");
};

/* 选择的值 */
const handleSelect = (v: { label: string; value: number | string }) => {
  is_unfold.value = false;
  currentValue.value = v.label;
  sort_text.value = v.label;
  emit("select", v.value);
  $switchStore.$clickAudio();
};
</script>

<template>
  <div class="select-filter cursor-pointer" @click="handleShowList">
    <div class="title">{{ sort_text }}</div>
    <img
      :class="{ 'arrow-active': is_unfold }"
      :src="IMGBED + '/image/arrow.png'"
      alt="arrow"
      class="arrow"
      @dragstart.prevent
    />
    <!-- 展开列表 -->
    <div
      class="select-list"
      :class="{ unfold: !is_unfold }"
      :style="{ height: listHeight }"
      @click.stop
    >
      <transition-group name="select-list">
        <button
          v-for="item in data"
          :key="item.value"
          class="box"
          :class="{
            active: currentValue === item.label || sort_text === item.label,
          }"
          @mousedown="handleSelect(item)"
          @mouseenter="handleEnterItem(item)"
          @mouseleave="currentValue = ''"
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

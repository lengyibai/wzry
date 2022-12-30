<script setup lang="ts">
import { ref } from "vue";

interface Props {
  data: { label: string; value: string | number }[];
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

const sort_text = ref("默认排序");
const is_unfold = ref(false);
const currentValue = ref("");

sort_text.value = props.data[0].label;

/* 显示列表 */
const handleShowList = () => {
  is_unfold.value = !is_unfold.value;
};

/* 选择的值 */
const handleSelect = (v: { label: string; value: number | string }) => {
  currentValue.value = v.label;
  sort_text.value = v.label;
  emit("select", v.value);
};
</script>

<template>
  <div class="select-filter" @click="handleShowList">
    <div class="title">{{ sort_text }}</div>
    <img src="https://lengyibai.gitee.io/wzry-material/image/arrow.png" alt="arrow" class="arrow" />
    <!-- 展开列表 -->
    <div class="select-list" :class="{ unfold: !is_unfold }" :style="{ height: listHeight }">
      <transition-group name="select-list">
        <button
          class="box"
          :class="{
            active: currentValue === item.label || sort_text === item.label,
          }"
          v-for="item in data"
          @mousedown="handleSelect(item)"
          @mouseenter="currentValue = item.label"
          @mouseleave="currentValue = ''"
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

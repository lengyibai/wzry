<script setup lang="ts" generic="T extends string">
import { onMounted, ref } from "vue";

import { AudioStore } from "@/store";
import { vMouseTip } from "@/directives";
import { _getImgLink } from "@/utils/concise";

interface Props {
  options: T[];
  /** 是否显示线条 */
  line?: boolean;
}
withDefaults(defineProps<Props>(), {
  line: false,
});

const $emit = defineEmits<{
  tab: [v: number];
}>();

const $audioStore = AudioStore();

const categoryRef = ref<HTMLElement>();

/** 当前点击的分类索引 */
const current_index = ref(0);
/** 线条x坐标 */
const left = ref(0);
/** 线条宽度 */
const width = ref(0);

/* 点击分类标题 */
const handleToggle = (index: number) => {
  if (!categoryRef.value) return;
  current_index.value = index;
  $audioStore.play("n4r4");
  $emit("tab", index);

  const parent_width = categoryRef.value.clientWidth;
  const el = categoryRef.value!.children[index + 1] as HTMLElement;
  const x = el.getBoundingClientRect().x;

  /** 点击的tab距离中间的差值 */
  const center_difference = x - parent_width / 2 + el.offsetWidth / 2;
  /** 容器需要滚动的长度 */
  const scroll_left = el.offsetLeft - x + center_difference;

  left.value = el.offsetLeft;
  width.value = el.offsetWidth;
  categoryRef.value.scroll({ behavior: "smooth", left: scroll_left });
};

onMounted(() => {
  handleToggle(0);
});
</script>

<template>
  <div class="epigraph-tool">
    <div
      ref="categoryRef"
      class="epigraph-category"
      :class="{
        line: line,
      }"
    >
      <!-- 滑动的图标 -->
      <img
        :style="{ left: left + 'px', width: width + 'px' }"
        :src="_getImgLink('epigraph_active')"
        alt=""
      />

      <!-- 文字 -->
      <div
        v-for="(item, index) in options"
        :key="index"
        v-mouse-tip
        class="title"
        :class="{ active: current_index === index }"
        @click="handleToggle(index)"
      >
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

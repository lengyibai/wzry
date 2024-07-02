<script setup lang="ts" generic="T extends string">
import { onMounted, ref, watch } from "vue";

import { vMouseTip } from "@/directives";
import { _getMiscLink } from "@/utils/concise";
import { usePlayAudio } from "@/hooks";

interface Props {
  options: T[];
  /** 是否显示线条 */
  line?: boolean;
  /** 标题宽度，在auto为false时使用 */
  titleWidth?: string;
  /** 是否启用标题宽度自适应 */
  auto?: boolean;
}
withDefaults(defineProps<Props>(), {
  line: false,
  titleWidth: "initial",
  gap: "initial",
  auto: true,
});

const current_index = defineModel<number>({ required: true });

const { playAudio } = usePlayAudio();

const categoryRef = ref<HTMLElement>();

/** 线条x坐标 */
const left = ref(0);
/** 线条宽度 */
const width = ref(0);

/** @description 点击分类标题
 * @param index 分类索引
 */
const handleToggle = (index: number) => {
  current_index.value = index;
  playAudio("n4r4");
  handleResize(index);
};

/** @description 调整线条位置 */
const handleResize = (index: number) => {
  if (!categoryRef.value) return;
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

watch(current_index, handleResize);

onMounted(() => {
  handleToggle(0);
});
</script>

<template>
  <div
    ref="categoryRef"
    class="k-category"
    :class="{
      line: line,
    }"
  >
    <!-- 滑动的图标 -->
    <img
      :style="{ left: left + 'px', width: width + 'px' }"
      :src="_getMiscLink('epigraph_active')"
      alt=""
    />

    <!-- 文字 -->
    <div
      v-for="(item, index) in options"
      :key="index"
      v-mouse-tip
      class="title"
      :style="{
        width: titleWidth,
      }"
      :class="{ active: current_index === index, auto }"
      @click="handleToggle(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

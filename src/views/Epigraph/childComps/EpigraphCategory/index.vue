<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";

import { AudioStore, EpigraphStore } from "@/store";
import { $concise } from "@/utils";
import { vMouseTip } from "@/directives";

const $audioStore = AudioStore();
const $epigraphStore = EpigraphStore();

const { getImgLink } = $concise;

/** 顶部铭文分类标题 */
const epigraph: Record<string, Game.Epigraph.Category>[] = [
  { title: "全部" },
  { title: "攻击" },
  { title: "生命" },
  { title: "防御" },
  { title: "功能" },
  { title: "吸血" },
  { title: "攻速" },
  { title: "暴击" },
  { title: "穿透" },
];

const epigraphCategoryRef = ref<HTMLElement>();

/** 当前点击的分类索引 */
const current_index = ref(0);
/** 线条x坐标 */
const left = ref(0);
/** 线条宽度 */
const width = ref(0);

/* 点击分类标题 */
const handleToggle = (index: number, type: Game.Epigraph.Category) => {
  if (!epigraphCategoryRef.value) return;
  current_index.value = index;
  $audioStore.play("n4r4");
  $epigraphStore.setFilter(type);

  const parent_width = epigraphCategoryRef.value.clientWidth;
  const el = epigraphCategoryRef.value!.children[index + 1] as HTMLElement;
  const x = el.getBoundingClientRect().x;

  /** 点击的tab距离中间的差值 */
  const center_difference = x - parent_width / 2 + el.offsetWidth / 2;
  /** 容器需要滚动的长度 */
  const scroll_left = el.offsetLeft - x + center_difference;

  left.value = el.offsetLeft;
  width.value = el.offsetWidth;
  epigraphCategoryRef.value.scroll({ behavior: "smooth", left: scroll_left });
};

onMounted(() => {
  handleToggle(0, "全部");
});
</script>

<template>
  <div class="epigraph-tool">
    <div ref="epigraphCategoryRef" class="epigraph-category">
      <!-- 滑动的图标 -->
      <img
        :style="{ left: left + 'px', width: width + 'px' }"
        :src="getImgLink('epigraph_active')"
        alt=""
      />

      <!-- 文字 -->
      <button
        v-for="(item, index) in epigraph"
        :key="index"
        v-mouse-tip
        class="title"
        :class="{ active: current_index === index }"
        @click="handleToggle(index, item.title)"
      >
        <span>{{ item.title }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

<template>
  <div class="epigraph-category">
    <img
      :style="{ left: currentIndex * 11.11 + '%' }"
      src="https://lengyibai.gitee.io/wzry-material/image/epigraph_active.png"
      alt=""
    />
    <button
      class="title"
      :class="{ active: currentIndex === index }"
      @click="toggle(index, item.title)"
      v-for="(item, index) in epigraph"
      :key="index"
    >
      <span>{{ item.title }}</span>
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import epigraphStore from "@/store/epigraph";
import switchStore from "@/store/globalSwitch";

const $switchStore = switchStore();
const $epigraphStore = epigraphStore();

const currentIndex = ref(0); //当前点击的分类索引

/* 顶部铭文分类标题 */
const epigraph = [
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

/* 获取上次铭文类型的索引位置 */
currentIndex.value = epigraph.findIndex((item) => {
  return $epigraphStore.type === item.title;
});

/* 点击分类标题 */
const toggle = (index: number, type: string) => {
  $switchStore.$clickAudio(`tab${index}`); //由于连续点击同样的音效名会触发重复，所以追加索引号实现唯一性
  currentIndex.value = index;
  $epigraphStore.setFilter(type); //每次点击重新筛选数据
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>

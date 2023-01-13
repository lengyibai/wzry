<script setup lang="ts">
import { ref } from "vue";
import epigraphStore from "@/store/epigraph";
import switchStore from "@/store/globalSwitch";

const $switchStore = switchStore();
const $epigraphStore = epigraphStore();

const current_index = ref(0); //当前点击的分类索引

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

/* 点击分类标题 */
const handleToggle = (index: number, type: string) => {
  $switchStore.$clickAudio(`tab${index}`); //由于连续点击同样的音效名会触发重复，所以追加索引号实现唯一性
  current_index.value = index;
  $epigraphStore.setFilter(type); //每次点击重新筛选数据
};
</script>

<template>
  <div class="epigraph-tool">
    <div class="epigraph-category">
      <img
        :style="{ left: current_index * 11.11 + '%' }"
        src="https://lengyibai.gitee.io/img-bed/wzry/image/epigraph_active.png"
        alt=""
      />
      <button
        class="title"
        :class="{ active: current_index === index }"
        @click="handleToggle(index, item.title)"
        v-for="(item, index) in epigraph"
        :key="index"
      >
        <span>{{ item.title }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

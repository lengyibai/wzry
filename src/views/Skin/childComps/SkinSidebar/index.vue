<script setup lang="ts">
import otherStore from "@/store/other";
import skinStore from "@/store/skin";
import switchStore from "@/store/switch";

const $switchStore = switchStore();
const $skinStore = skinStore();
const $otherStore = otherStore();

const hero_type = [
  { name: "全部", icon: "wzry-quanbu" },
  { name: "坦克", icon: "wzry-tanke" },
  { name: "战士", icon: "wzry-zhanshi" },
  { name: "刺客", icon: "wzry-cike" },
  { name: "法师", icon: "wzry-fashi" },
  { name: "射手", icon: "wzry-sheshou" },
  { name: "辅助", icon: "wzry-fuzhu" },
];

/* 选择职业并筛选显示英雄 */
const handleSelect = (name: string, index: number) => {
  $switchStore.$clickAudio(`默认${index}`);
  $skinStore.setProfessional(name);
};
</script>

<template>
  <div class="skin-sidebar" :class="{ collapse: $otherStore.collapse }">
    <div
      v-for="(item, index) in hero_type"
      :key="index"
      class="hero-type cursor-pointer"
      :class="{ active: item.name === $skinStore.profession }"
      @click="handleSelect(item.name, index)"
    >
      <i class="iconfont" :class="item.icon" />
      <span class="name">{{ item.name }}</span>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

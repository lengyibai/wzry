<script setup lang="ts">
import { ref } from "vue";
import switchStore from "@/store/globalSwitch";
import heroStore from "@/store/hero";
import $bus from "@/utils/eventBus";

const $switchStore = switchStore();
const $heroStore = heroStore();

const hero_type = [
  { name: "全部", icon: "wzry-quanbu" },
  { name: "坦克", icon: "wzry-tanke" },
  { name: "战士", icon: "wzry-zhanshi" },
  { name: "刺客", icon: "wzry-cike" },
  { name: "法师", icon: "wzry-fashi" },
  { name: "射手", icon: "wzry-sheshou" },
  { name: "辅助", icon: "wzry-fuzhu" },
];

const collapse = ref(false); //是否折叠

$bus.on("collapse", (v) => {
  collapse.value = v as boolean;
});

/* 选择职业并筛选显示英雄 */
const handleSelect = (name: string, index: number) => {
  $switchStore.$clickAudio(`默认${index}`);
  $heroStore.setProfessional(name);
};
</script>

<template>
  <div class="hero-sidebar" :class="{ collapse: collapse }">
    <div
      class="hero-type cursor-pointer"
      :class="{ active: item.name === $heroStore.profession }"
      v-for="(item, index) in hero_type"
      @click="handleSelect(item.name, index)"
      :key="index"
    >
      <i class="iconfont" :class="item.icon" />
      <span class="name">{{ item.name }}</span>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

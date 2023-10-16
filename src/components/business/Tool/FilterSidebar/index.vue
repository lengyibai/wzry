<script setup lang="ts">
import { computed, ref } from "vue";

import { AudioStore, HeroStore, CollapseStore, SkinStore, EquipStore } from "@/store";

interface Props {
  /** 用于不同列表的筛选类型 */
  type: "hero" | "skin" | "equip";
}
const $props = withDefaults(defineProps<Props>(), {
  type: "hero",
});

interface Emits {
  (e: "change"): void;
}
const $emit = defineEmits<Emits>();

const $audioStore = AudioStore();
const $skinStore = SkinStore();
const $heroStore = HeroStore();
const $collapseStore = CollapseStore();
const $equipStore = EquipStore();

const hero_type: { name: Hero.Profession; icon: string }[] = [
  { name: "全部", icon: "wzry-quanbu" },
  { name: "坦克", icon: "wzry-tanke" },
  { name: "战士", icon: "wzry-zhanshi" },
  { name: "刺客", icon: "wzry-cike" },
  { name: "法师", icon: "wzry-fashi" },
  { name: "射手", icon: "wzry-sheshou" },
  { name: "辅助", icon: "wzry-fuzhu" },
];

const equip_type: { name: Equip.Category; icon: string }[] = [
  { name: "攻击", icon: "wzry-gongji" },
  { name: "法术", icon: "wzry-fashu" },
  { name: "防御", icon: "wzry-fangyu" },
  { name: "移动", icon: "wzry-yidong" },
  { name: "打野", icon: "wzry-daye" },
  { name: "游走", icon: "wzry-youzou" },
];

/** 滑块坐标 */
const top = ref(0);

/** 动态list */
const list = computed(() => (["hero", "skin"].includes($props.type) ? hero_type : equip_type));

/** 用于比较的筛选类型 */
const filter_type = computed(() => {
  const obj = {
    hero: $heroStore.profession,
    skin: $skinStore.profession,
    equip: $equipStore.category,
  };
  return obj[$props.type];
});

/* 选择类型并筛选显示 */
const handleSelect = (name: Hero.Profession | Equip.Category, index: number) => {
  $audioStore.play(`默认${index}`);

  const obj = {
    hero: () => $heroStore.setProfessional(name as Hero.Profession),
    skin: () => $skinStore.setProfessional(name as Hero.Profession),
    equip: () => $equipStore.setType(name as Equip.Category),
  };

  obj[$props.type]();

  $emit("change");
};

/* 设置滑块位置 */
const handleCoord = (e: Event) => {
  const el = e.target as HTMLElement;
  top.value = el.getBoundingClientRect().top - 75;
};
</script>

<template>
  <div class="filter-sidebar" :class="{ collapse: $collapseStore.collapse }">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="filter-type global_cursor-pointer"
      :class="{ active: item.name === filter_type }"
      @click="handleSelect(item.name, index), handleCoord($event)"
    >
      <i class="iconfont" :class="item.icon" />
      <span class="name">{{ $t(item.name) }}</span>
    </div>

    <!-- 滑块 -->
    <div
      v-show="!$collapseStore.collapse"
      class="slider"
      :style="{
        top: top + 'px',
      }"
    ></div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

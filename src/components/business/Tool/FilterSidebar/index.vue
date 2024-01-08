<script setup lang="ts">
import { computed, ref, watch } from "vue";

import { AudioStore, HeroStore, CollapseStore, SkinStore, EquipStore, AtlasStore } from "@/store";
import { vMouseTip } from "@/directives";

interface Props {
  /** 用于不同列表的筛选类型 */
  type: "hero" | "skin" | "equip" | "atlas";
}

const $props = withDefaults(defineProps<Props>(), {
  type: "hero",
});
const $emit = defineEmits<{
  change: [];
}>();

const $audioStore = AudioStore();
const $skinStore = SkinStore();
const $heroStore = HeroStore();
const $collapseStore = CollapseStore();
const $equipStore = EquipStore();
const $atlasStore = AtlasStore();

const hero_type: { name: Game.Hero.Profession; icon: string }[] = [
  { name: "全部", icon: "wzry-quanbu" },
  { name: "坦克", icon: "wzry-tanke" },
  { name: "战士", icon: "wzry-zhanshi" },
  { name: "刺客", icon: "wzry-cike" },
  { name: "法师", icon: "wzry-fashi" },
  { name: "射手", icon: "wzry-sheshou" },
  { name: "辅助", icon: "wzry-fuzhu" },
];

const equip_type: { name: Game.Equip.Category; icon: string }[] = [
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
const list = computed(() =>
  ["hero", "skin", "atlas"].includes($props.type) ? hero_type : equip_type,
);

/** 用于比较的筛选类型 */
const filter_type = computed(() => {
  const obj = {
    hero: $heroStore.profession,
    skin: $skinStore.profession,
    atlas: $atlasStore.profession,
    equip: $equipStore.category,
  };
  return obj[$props.type];
});

/* 选择类型并筛选显示 */
const handleSelect = (name: Game.Hero.Profession | Game.Equip.Category) => {
  const obj = {
    hero: () => $heroStore.setProfessional(name as Game.Hero.Profession),
    skin: () => $skinStore.setProfessional(name as Game.Hero.Profession),
    atlas: () => $atlasStore.setProfessional(name as Game.Hero.Profession),
    equip: () => $equipStore.setType(name as Game.Equip.Category),
  };
  obj[$props.type]();

  if (window.innerWidth < 960) {
    $collapseStore.setCollapse(true);
  }

  $emit("change");
  $audioStore.play();
};

/* 设置滑块位置 */
const handleCoord = (e: Event) => {
  const el = e.target as HTMLElement;
  top.value = el.getBoundingClientRect().top - 75;
};

watch(filter_type, (v) => {
  if (v === "全部") {
    top.value = 0;
  }
});
</script>

<template>
  <div class="filter-sidebar" :class="{ collapse: $collapseStore.collapse }">
    <div
      v-for="(item, index) in list"
      :key="index"
      v-mouse-tip="{
        text: '分类：' + item.name,
      }"
      class="filter-type"
      :class="{ active: item.name === filter_type }"
      @click="handleSelect(item.name), handleCoord($event)"
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

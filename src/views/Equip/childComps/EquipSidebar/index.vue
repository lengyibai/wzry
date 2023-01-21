<script setup lang="ts">
import switchStore from "@/store/switch";
import equipStore from "@/store/equip";

const $switchStore = switchStore();
const $equipStore = equipStore();

const hero_type: {
  name: string;
  icon: string;
}[] = [
  { name: "攻击", icon: "wzry-gongji" },
  { name: "法术", icon: "wzry-fashu" },
  { name: "防御", icon: "wzry-fangyu" },
  { name: "移动", icon: "wzry-yidong" },
  { name: "打野", icon: "wzry-daye" },
  { name: "游走", icon: "wzry-youzou" },
];

/* 点击侧边栏菜单，播放音效及存储菜单名 */
const handleSelect = (name: string, index: number) => {
  $switchStore.$clickAudio(`默认${index}`);
  $equipStore.setType(name);
};
</script>

<template>
  <div class="equip-sidebar">
    <button
      v-for="(item, index) in hero_type"
      :key="index"
      class="hero-type"
      :class="{ active: item.name === $equipStore.category }"
      @click="handleSelect(item.name, index)"
    >
      <i class="iconfont" :class="item.icon" />
      <span class="name">{{ item.name }}</span>
    </button>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

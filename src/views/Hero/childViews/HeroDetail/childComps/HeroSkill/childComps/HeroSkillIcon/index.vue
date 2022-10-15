<template>
  <div class="HeroSkillIcon">
    <div class="icon" ref="skillImg" v-for="(item, index) in hero_data.skills" :key="index">
      <transition name="borderFade">
        <div class="border" v-show="currentIndex === index"></div>
      </transition>
      <img :src="item.img" @click="selectSkill(index)" />
      <img :src="item.img" :class="{ active: currentIndex === index }" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { Hero } from '@/interface/hero';
import { heroDefault } from '@/interface/defaults';
import heroStore from '@/store/hero';

const $heroStore = heroStore();

const hero_data = ref<Hero>(heroDefault); //英雄数据
hero_data.value = $heroStore.hero_info;
const currentIndex = ref(0); //处于展示的技能索引

/* 点击需要展示的技能 */
const emit = defineEmits<{
  (e: 'select-skill', index: number): void;
}>();

/* 点击技能后传递索引号 */
const selectSkill = (index: number) => {
  currentIndex.value = index;
  emit('select-skill', index);
};
</script>
<style scoped lang="less">
@import './index.less';
</style>

<template>
  <div class="HeroSkillContent">
    <HeroSkillContentLeft :activeSkill="activeSkill" :style="{ width: activeSkill.effect ? '45%' : '100%' }" />
    <HeroSkillContentRight :activeSkill="activeSkill" v-if="activeSkill.effect" />
  </div>
</template>
<script setup>
import { computed, inject, toRefs } from 'vue';
import HeroSkillContentLeft from './childComps/HeroSkillContentLeft/index.vue';
import HeroSkillContentRight from './childComps/HeroSkillContentRight/index.vue';

import heroStore from '@/store/hero';

const props = defineProps({
  /* 当前展示技能的索引 */
  index: {
    type: Number,
    default: 0,
  },
});

const $heroStore = heroStore();
const hero_data = $heroStore.hero_info;

const { index } = toRefs(props);

const activeSkill = computed(() => {
  return hero_data.skills[index.value];
});
</script>
<style scoped lang="less">
.HeroSkillContent {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2em;
}
</style>

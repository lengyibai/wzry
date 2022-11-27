<template>
  <div class="hero-skill-content">
    <HeroSkillContentLeft :activeSkill="activeSkill" :style="{ width: activeSkill.effect ? '45%' : '100%' }" />
    <HeroSkillContentRight :activeSkill="activeSkill" v-if="activeSkill.effect" />
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import HeroSkillContentLeft from "./childComps/HeroSkillContentLeft/index.vue";
import HeroSkillContentRight from "./childComps/HeroSkillContentRight/index.vue";
import heroStore from "@/store/hero";

interface Props {
  index: number; //当前展示技能的索引
}

const props = withDefaults(defineProps<Props>(), {
  index: 0,
});

const $heroStore = heroStore();
const hero_data = $heroStore.hero_info;

const activeSkill = computed(() => {
  return hero_data.skills[props.index];
});
</script>
<style scoped lang="less">
@import url("./index.less");
</style>

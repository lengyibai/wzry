<script setup lang="ts">
import { ref, computed, onUnmounted } from "vue";

import HeroSkillContentLeft from "./childComps/HeroSkillContentLeft/index.vue";
import HeroSkillContentRight from "./childComps/HeroSkillContentRight/index.vue";

import { HeroDetailStore } from "@/store";

interface Props {
  /** 技能信息 */
  skill: Hero.Skill;
}

const $props = defineProps<Props>();

const $heroDetail = HeroDetailStore();

/** 左右两边的入场动画 */
const show = ref(false);
/** 用于技能选择 */
const toggle = ref(false);

/** 存在技能效果 */
const exist_effect = computed(() => $props.skill.effect?.length);

/* 当滚动到技能页则显示技能 */
$heroDetail.setScollFn("skillContent", (index) => {
  if (index === 2) {
    show.value = true;
  }
});

/* 选择技能触发 */
$heroDetail.setSkillSelectFn(() => {
  toggle.value = true;
  setTimeout(() => {
    toggle.value = false;
  }, 375);
});

onUnmounted(() => {
  $heroDetail.removeScollFn("skillContent");
});
</script>

<template>
  <div class="hero-skill-content">
    <div class="left" :style="{ width: exist_effect ? '45%' : '100%' }">
      <HeroSkillContentLeft
        :class="{ 'hide-left': !show || toggle }"
        :active-skill="skill"
        :is-passive="$heroDetail.skill_index === 0"
      />
    </div>
    <div class="right">
      <HeroSkillContentRight v-if="exist_effect" :class="{ 'hide-right': !show || toggle }" :active-skill="skill" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

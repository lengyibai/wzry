<script setup lang="ts">
import { ref, computed } from "vue";

import HeroSkillContentLeft from "./childComps/HeroSkillContentLeft/index.vue"; //左侧描述
import HeroSkillContentRight from "./childComps/HeroSkillContentRight/index.vue"; //右侧效果

import heroDetail from "@/store/heroDetail";

interface Props {
  skill: Hero.Skill; //技能信息
}
const props = defineProps<Props>();

const $heroDetail = heroDetail();

const show = ref(false); // 左右两边的入场动画
const toggle = ref(false); //用于技能选择

const exist_effect = computed(() => props.skill.effect?.length); //存在技能效果

/* 当滚动到技能页则显示技能 */
$heroDetail.setScollFn((index) => {
  if (index === 3) show.value = true;
});

/* 选择技能触发 */
$heroDetail.setSkillSelectFn(() => {
  toggle.value = true;
  setTimeout(() => {
    toggle.value = false;
  }, 375);
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
      <HeroSkillContentRight
        v-if="exist_effect"
        :class="{ 'hide-right': !show || toggle }"
        :active-skill="skill"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

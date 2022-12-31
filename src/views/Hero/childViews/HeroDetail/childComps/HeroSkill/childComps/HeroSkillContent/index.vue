<script setup lang="ts">
import { ref, computed } from "vue";
import heroDetail from "@/store/heroDetail";
import { skillDefault } from "@/defaultValue/defaults";
import HeroSkillContentLeft from "./childComps/HeroSkillContentLeft/index.vue";
import HeroSkillContentRight from "./childComps/HeroSkillContentRight/index.vue";

interface Props {
  skill: Hero.Skill;
}
const props = withDefaults(defineProps<Props>(), {
  skill: () => skillDefault,
});

const $heroDetail = heroDetail();

const show = ref(false); // 左右两边的入场动画
const toggle = ref(false); //用于技能选择

const exist_effect = computed(() => props.skill.effect?.length); //是否存在技能效果

/* 当滚动到技能页则显示技能 */
$heroDetail.setScollFn((index) => {
  if (index === 3) {
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
</script>

<template>
  <div class="hero-skill-content">
    <HeroSkillContentLeft
      :class="{ 'hide-left': !show || toggle }"
      :activeSkill="skill"
      :isPassive="$heroDetail.skill_index === 0"
      :style="{ width: exist_effect ? '45%' : '100%' }"
    />
    <HeroSkillContentRight
      :class="{ 'hide-right': !show || toggle }"
      :activeSkill="skill"
      v-if="exist_effect"
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

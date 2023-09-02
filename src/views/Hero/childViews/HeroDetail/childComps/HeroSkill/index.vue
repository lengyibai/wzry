<script setup lang="ts">
import { ref } from "vue";

import HeroSkillIcon from "./childComps/HeroSkillIcon/index.vue";
import HeroSkillContent from "./childComps/HeroSkillContent/index.vue";

/** 技能信息 */
const hero_skill = ref<Hero.Skill>();

/* 选择技能 */
const onSelectSkill = (skill: Hero.Skill) => {
  setTimeout(() => {
    hero_skill.value = skill;
  }, 375);
};
</script>

<template>
  <div class="hero-skill">
    <!--技能图标-->
    <HeroSkillIcon @select-skill="onSelectSkill" />

    <!--主体内容-->
    <transition name="fade">
      <HeroSkillContent v-if="hero_skill" :skill="hero_skill" />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

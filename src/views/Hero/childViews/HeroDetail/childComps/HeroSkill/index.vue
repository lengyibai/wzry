<script setup lang="ts">
import { ref } from "vue";
import HeroSkillIcon from "./childComps/HeroSkillIcon/index.vue"; //技能图标
import HeroSkillContent from "./childComps/HeroSkillContent/index.vue"; //主体内容

const hero_skill = ref<Hero.Skill>(); //技能信息

/* 选择技能 */
const EmitSelectSkill = (skill: Hero.Skill) => {
  setTimeout(() => {
    hero_skill.value = skill;
  }, 375);
};
</script>

<template>
  <div class="hero-skill">
    <!--技能图标-->
    <HeroSkillIcon @select-skill="EmitSelectSkill" />

    <!--主体内容-->
    <transition name="fade">
      <HeroSkillContent :skill="hero_skill" v-if="hero_skill" />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

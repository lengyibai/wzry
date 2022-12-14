<template>
  <div class="hero-skill">
    <!--技能图标-->
    <HeroSkillIcon @select-skill="EmitSelectSkill" />

    <!--主体内容-->
    <transition name="fade">
      <HeroSkillContent :skill="hero_skills" v-if="hero_skills" />
    </transition>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import HeroSkillIcon from "./childComps/HeroSkillIcon/index.vue"; //技能图标
import HeroSkillContent from "./childComps/HeroSkillContent/index.vue"; //主体内容

const toggle = ref(true); //用于切换动画
const hero_skills = ref<Hero.Skill>();

/* 选择技能 */
const EmitSelectSkill = (skills: Hero.Skill) => {
  toggle.value = false;
  setTimeout(() => {
    toggle.value = true;
    hero_skills.value = skills;
  }, 375);
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>

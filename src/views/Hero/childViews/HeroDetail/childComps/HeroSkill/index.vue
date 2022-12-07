<template>
  <div class="hero-skill">
    <!--技能图标-->
    <HeroSkillIcon @select-skill="selectSkill" />

    <!--主体内容-->
    <transition name="fade">
      <HeroSkillContent :index="index" />
    </transition>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import heroDetailStore from "@/store/heroDetail";
import HeroSkillIcon from "./childComps/HeroSkillIcon/index.vue"; //技能图标
import HeroSkillContent from "./childComps/HeroSkillContent/index.vue"; //主体内容

const $heroDetailStore = heroDetailStore();

const toggle = ref(true); //用于切换动画
const index = ref(0); //当前展示技能的索引

/* 切换技能 */
const selectSkill = (i: number) => {
  toggle.value = false;
  $heroDetailStore.skillToggler();
  setTimeout(() => {
    toggle.value = true;
    index.value = i;
  }, 375);
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>

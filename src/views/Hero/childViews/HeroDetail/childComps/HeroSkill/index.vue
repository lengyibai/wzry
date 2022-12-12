<template>
  <div class="hero-skill">
    <!--技能图标-->
    <HeroSkillIcon @select-skill="EmitSelectSkill" @toggle-skill="EmitToggleSkill" :status="deputy_status" />

    <!--主体内容-->
    <transition name="fade">
      <HeroSkillContent :skill="activeSkill" />
    </transition>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import heroDetailStore from "@/store/heroDetail";
import heroStore from "@/store/hero";
import HeroSkillIcon from "./childComps/HeroSkillIcon/index.vue"; //技能图标
import HeroSkillContent from "./childComps/HeroSkillContent/index.vue"; //主体内容

const $heroStore = heroStore();
const $heroDetailStore = heroDetailStore();

const toggle = ref(true); //用于切换动画
const index = ref(0); //当前展示技能的索引
const hero_data = $heroStore.hero_info;
const deputy_status = ref(false); //是否使用副技能

/* 处于展示的技能 */
const activeSkill = computed(() => {
  if (deputy_status.value) {
    return hero_data.deputy[index.value];
  }
  return hero_data.skills[index.value];
});

/* 选择技能 */
const EmitSelectSkill = (i: number) => {
  toggle.value = false;
  $heroDetailStore.skillToggler(i);
  setTimeout(() => {
    toggle.value = true;
    index.value = i;
  }, 375);
};

/* 切换副技能 */
const EmitToggleSkill = () => {
  deputy_status.value = !deputy_status.value;
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>

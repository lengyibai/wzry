<template>
  <div class="hero-skill-content">
    <HeroSkillContentLeft
      :class="{ 'hide-left': !show || toggle }"
      :activeSkill="activeSkill"
      :style="{ width: activeSkill.effect ? '45%' : '100%' }"
    />
    <HeroSkillContentRight
      :class="{ 'hide-right': !show || toggle }"
      :activeSkill="activeSkill"
      v-if="activeSkill.effect"
    />
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import HeroSkillContentLeft from "./childComps/HeroSkillContentLeft/index.vue";
import HeroSkillContentRight from "./childComps/HeroSkillContentRight/index.vue";
import heroStore from "@/store/hero";
import heroDetail from "@/store/heroDetail";

interface Props {
  index: number; //当前展示技能的索引
}

const props = withDefaults(defineProps<Props>(), {
  index: 0,
});

const $heroStore = heroStore();
const $heroDetail = heroDetail();

const show = ref(false); // 左右两边的入场动画
const toggle = ref(false); //用于技能切换
const hero_data = $heroStore.hero_info;

/* 处于展示的技能信息 */
const activeSkill = computed(() => {
  return hero_data.skills[props.index];
});

$heroDetail.setScollFn((index) => {
  if (index === 3) {
    show.value = true;
  }
});

$heroDetail.setSkillToggleFn(() => {
  toggle.value = true;
  setTimeout(() => {
    toggle.value = false;
  }, 375);
});
</script>
<style scoped lang="less">
@import url("./index.less");
</style>

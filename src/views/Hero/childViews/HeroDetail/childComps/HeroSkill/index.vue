<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

import HeroSkillIcon from "./childComps/HeroSkillIcon/index.vue";
import HeroSkillContent from "./childComps/HeroSkillContent/index.vue";

import { KScrollTip } from "@/components/business";
import { HeroDetailStore } from "@/store";

const { hero_info } = storeToRefs(HeroDetailStore());
const { setScollFn } = HeroDetailStore();

const heroSkillIconRef = ref<InstanceType<typeof HeroSkillIcon>>();

/** 显示技能切换图标 */
const show = ref(false);
/** 技能信息 */
const hero_skill = ref<Hero.Skill>();

/* 当滚动到技能页，播放出场动画 */
setScollFn("skinIcon", (index) => {
  //只有当前页面未加载或者滚动索引为2才会触发
  if (show.value || index !== 2) return;
  show.value = true;
});

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
    <HeroSkillIcon ref="heroSkillIconRef" @select-skill="onSelectSkill" />

    <!--主体内容-->
    <transition name="fade">
      <HeroSkillContent v-if="hero_skill" :skill="hero_skill" />
    </transition>

    <!-- 可滚动提示 -->
    <KScrollTip ref="downRef" />

    <!-- 切换副技能 -->
    <i
      v-if="hero_info.skills!.length > 1"
      ref="toggleRef"
      class="toggle iconfont wzry-qiehuan"
      :class="{ 'hide-bottom': !show }"
      title="切换技能"
      @click="heroSkillIconRef?.toggleSkill"
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

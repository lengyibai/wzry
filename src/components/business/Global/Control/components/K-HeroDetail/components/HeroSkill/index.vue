<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

import HeroSkillIcon from "./components/HeroSkillIcon/index.vue";
import HeroSkillContent from "./components/HeroSkillContent/index.vue";
import HeroSkillToggle from "./components/HeroSkillToggle/index.vue";

import { KScrollTip } from "@/components/business";
import { HeroDetailStore } from "@/store";

const $heroDetailStore = HeroDetailStore();

const { hero_info } = storeToRefs($heroDetailStore);

const heroSkillIconRef = ref<InstanceType<typeof HeroSkillIcon>>();

/** 技能信息 */
const hero_skill = ref<Remote.Skill.Info>();

/* 选择技能 */
const onSelectSkill = (skill: Remote.Skill.Info) => {
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

    <!-- 切换副技能 -->
    <HeroSkillToggle v-if="hero_info.skills.length > 1" @toggle="heroSkillIconRef?._toggleSkill" />

    <!-- 可滚动提示 -->
    <KScrollTip />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

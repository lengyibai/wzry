<script setup lang="ts">
import SkillTypeTag from "./components/SkillTypeTag/index.vue";

import { HeroDetailStore } from "@/store";

interface Props {
  /** 选中的技能 */
  activeSkill: Remote.Skill.Info;
  /** 是否为被动技能 */
  isPassive: boolean;
}

defineProps<Props>();

const $heroDetail = HeroDetailStore();
</script>

<template>
  <div class="hero-skill-content-left">
    <!--名称及类型-->
    <div class="name-type">
      <div class="name">{{ activeSkill.name }}</div>
      <SkillTypeTag v-for="item in activeSkill.type" :key="item" :type="item" />
    </div>

    <!--数字相关-->
    <div class="cd-consume">
      <div v-if="!isPassive" class="cd">CD：{{ activeSkill.cd }}秒</div>
      <div v-if="!isPassive" class="consume">
        {{ $heroDetail.hero_info.skillUnit }}消耗：{{ activeSkill.consume }}
      </div>
      <div v-else class="passive">被动</div>
    </div>

    <!--描述-->
    <div class="desc" v-html="activeSkill.desc"></div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

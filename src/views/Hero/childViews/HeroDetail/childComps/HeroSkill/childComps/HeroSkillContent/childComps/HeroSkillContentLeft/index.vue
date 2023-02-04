<script setup lang="ts">
import heroDetail from "@/store/heroDetail";

interface Props {
  activeSkill: Hero.Skill;
  isPassive: boolean;
}
defineProps<Props>();

const $heroDetail = heroDetail();
</script>

<template>
  <div class="hero-skill-content-left">
    <!--名称及类型-->
    <div class="name-type">
      <div class="name">{{ activeSkill.name }}</div>
      <K-SkillTypeTag v-for="item in activeSkill.type" :key="item" :type="item" />
    </div>

    <!--数字相关-->
    <div class="cd-consume">
      <div v-if="!isPassive" class="cd">CD：{{ activeSkill.cd }}秒</div>
      <div v-if="!isPassive" class="consume">{{ $heroDetail.hero_info.skillUnit }}消耗：{{ activeSkill.consume }}</div>
      <div v-else class="passive">被动</div>
    </div>

    <!--描述-->
    <div class="desc" v-html="activeSkill.desc"></div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

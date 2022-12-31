<script setup lang="ts">
import heroDetail from "@/store/heroDetail";
import { skillDefault } from "@/defaultValue/defaults";
interface Props {
  activeSkill: typeof skillDefault;
  isPassive: boolean;
}
withDefaults(defineProps<Props>(), {
  activeSkill: () => skillDefault,
  isPassive: false,
});

const $heroDetail = heroDetail();
</script>

<template>
  <div class="hero-skill-content-left">
    <!--名称及类型-->
    <div class="name-type">
      <div class="name">{{ activeSkill.name }}</div>
      <K-SkillTypeTag
        v-for="item in activeSkill.type"
        :type="item"
        :key="item"
      />
    </div>

    <!--数字相关-->
    <div class="cd-consume">
      <div class="cd" v-if="!isPassive">CD：{{ activeSkill.cd }}秒</div>
      <div class="consume" v-if="!isPassive">
        {{ $heroDetail.hero_info.skillUnit }}消耗：{{ activeSkill.consume }}
      </div>
      <div class="passive" v-else>被动</div>
    </div>

    <!--描述-->
    <div class="desc" v-html="activeSkill.desc"></div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

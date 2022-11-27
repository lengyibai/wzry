<template>
  <div class="hero-skill-content-left">
    <!--名称及类型-->
    <div class="name-type">
      <div class="name">{{ activeSkill.name }}</div>
      <K-SkillTypeTag v-for="item in activeSkill.type" :type="item" :key="item" />
    </div>

    <!--数字相关-->
    <div class="cd-consume">
      <div class="cd" v-if="activeSkill.cd">CD：{{ activeSkill.cd }}秒</div>
      <div class="consume" v-if="activeSkill.cd">法力消耗：{{ activeSkill.consume }}</div>
      <div class="passive" v-else>被动</div>
    </div>

    <!--描述-->
    <div class="desc" v-html="activeSkill.desc"></div>
  </div>
</template>
<script setup lang="ts">
import { skillDefault } from "@/defaultValue/defaults";
interface Props {
  activeSkill: typeof skillDefault;
}
withDefaults(defineProps<Props>(), {
  activeSkill: () => skillDefault,
});
</script>
<style scoped lang="less">
@import url("./index.less");
</style>

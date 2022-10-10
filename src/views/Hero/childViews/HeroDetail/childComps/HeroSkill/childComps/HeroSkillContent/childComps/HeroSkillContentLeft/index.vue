<template>
  <div class="HeroSkillContentLeft">
    <!--名称及类型-->
    <div class="name-type">
      <div class="name">{{ activeSkill.name }}</div>
      <K-SkillTypeTag v-for="(item, index) in activeSkill.type" :type="item" :key="index" />
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
<script setup>
defineProps({
  activeSkill: {
    type: Object,
    default() {
      return {};
    },
  },
});
</script>
<style scoped lang="less">
.HeroSkillContentLeft {
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  .name-type {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    .name {
      font-size: 50px;
      margin-right: 15px;
      text-shadow: var(--t-shadow);
    }
  }
  .cd-consume {
    display: flex;
    margin-bottom: 15px;
    .cd,
    .consume,
    .passive {
      font-size: 35px;
      margin-right: 35px;
      text-shadow: var(--t-shadow);
    }
    .passive {
      color: var(--gray);
    }
  }
  .desc {
    font-size: 26px;
    text-shadow: var(--t-shadow);
    :deep(*) {
      font-size: inherit;
    }
  }
}
</style>

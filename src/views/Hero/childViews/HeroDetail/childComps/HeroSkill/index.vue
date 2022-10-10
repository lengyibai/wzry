<template>
  <div class="HeroSkill">
    <div class="title">技能</div>
    <!--技能图标-->
    <HeroSkillIcon @select-skill="selectSkill" />

    <!--主体内容-->
    <transition name="fade">
      <HeroSkillContent :index="index" v-show="toggle" />
    </transition>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import HeroSkillIcon from './childComps/HeroSkillIcon/index.vue'; //技能图标
import HeroSkillContent from './childComps/HeroSkillContent/index.vue'; //主体内容

const toggle = ref(true); //用于切换动画
const index = ref(0); //当前展示技能的索引

const selectSkill = (i) => {
  toggle.value = false;
  setTimeout(() => {
    toggle.value = true;
    index.value = i;
  }, 375);
};
</script>
<style scoped lang="less">
.HeroSkill {
  width: 100%;
  height: 100%;
  overflow: auto;
  color: var(--white);
  background-color: rgba(0, 0, 0, 0.5);
  .title {
    font-size: 50px;
    text-align: center;
    margin-top: 1em;
    text-shadow: var(--t-shadow);
    margin-bottom: 25px;
  }
}
</style>

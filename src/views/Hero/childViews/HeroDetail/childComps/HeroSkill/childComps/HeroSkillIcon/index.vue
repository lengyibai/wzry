<template>
  <div class="hero-skill-icon">
    <div
      class="icon cursor-pointer"
      :class="{ active: show }"
      ref="skillImg"
      v-for="(item, index) in active_skills"
      :style="{
        'transition-delay': 0.05 * index + 's',
      }"
      :key="index"
    >
      <transition name="border-fade">
        <div class="border" v-show="currentIndex === index"></div>
      </transition>
      <img :src="item.img" @click="handleSelectSkill(index)" />
      <img :src="item.img" :class="{ active: currentIndex === index }" />
    </div>

    <!-- 底部内容 -->
    <i
      v-if="hero_data.skills.length > 1"
      class="toggle iconfont wzry-qiehuan cursor-pointer"
      :class="{ 'hide-bottom': !show }"
      @click="handleToggleSkill"
      title="切换技能"
    ></i>
  </div>
</template>
<script setup lang="ts">
import { ref, toRef, computed } from "vue";
import heroStore from "@/store/hero";
import heroDetailStore from "@/store/heroDetail";

const $heroStore = heroStore();
const $heroDetailStore = heroDetailStore();

const show = ref(false); //是否显示技能
const currentIndex = ref(0); //处于展示的技能索引
const hero_data = toRef($heroStore, "hero_info"); //设置英雄详情
const deputy_index = ref(0); //主副技能索引
const active_skills = ref<Hero.Skill[]>([]); //展示的技能组
active_skills.value = hero_data.value.skills[deputy_index.value];

//处于展示的技能
const calcActiveSkill = computed(() => {
  return active_skills.value[currentIndex.value];
});

/* 设置需要滚动触发的函数 */
$heroDetailStore.setScollFn((index) => {
  show.value = index === 3;
});

/* 点击需要展示的技能 */
const emit = defineEmits<{
  (e: "select-skill", skills: [Hero.Skill, number]): void;
}>();

/* 点击技能后传递索引号 */
const handleSelectSkill = (index: number) => {
  currentIndex.value = index;
  $heroDetailStore.skillToggler(index);
  emit("select-skill", [calcActiveSkill.value, index]);
};
handleSelectSkill(0);

/* 切换副技能 */
const handleToggleSkill = () => {
  // 判断当前切换是否为最后一个副技能
  if (deputy_index.value === hero_data.value.skills.length - 1) {
    deputy_index.value = 0;
  } else {
    deputy_index.value += 1;
  }
  // 设置处于展示的技能组
  active_skills.value = hero_data.value.skills[deputy_index.value];
  // 如果当前技能留空，则使用主技能
  active_skills.value.forEach((item, index) => {
    if (!item.name) {
      active_skills.value[index] = hero_data.value.skills[0][index];
    }
  });
  // 更新技能信息
  handleSelectSkill(currentIndex.value);
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>

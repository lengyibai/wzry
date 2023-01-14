<script setup lang="ts">
import { ref, computed } from "vue";
import heroDetail from "@/store/heroDetail";
import heroDetailStore from "@/store/heroDetail";

interface Emits {
  (e: "select-skill", skills: Hero.Skill): void;
}

const emit = defineEmits<Emits>();

const $heroDetail = heroDetail();
const $heroDetailStore = heroDetailStore();

let deputy_index = 0; //主副技能索引

const show = ref(false); //是否显示技能
const current_index = ref(0); //处于展示的技能索引
const active_skills = ref<Hero.Skill[]>([]); //展示的技能组

//设置英雄详情
const hero_data = computed(() => {
  return $heroDetail.hero_info;
});
//处于展示的技能
const calcActiveSkill = computed(() => {
  return active_skills.value[current_index.value];
});

/* 设置需要滚动触发的函数 */
$heroDetailStore.setScollFn((index) => {
  show.value = index === 3;
});

active_skills.value = hero_data.value.skills![deputy_index];

/* 点击技能后传递索引号 */
const handleSelectSkill = (index: number) => {
  current_index.value = index;
  $heroDetailStore.skillToggler(index);
  $heroDetailStore.setSkillIndex(index);
  emit("select-skill", calcActiveSkill.value);
};
handleSelectSkill(0);

/* 切换副技能 */
const handleToggleSkill = () => {
  // 判断当前切换是否为最后一个副技能
  if (deputy_index === hero_data.value.skills!.length - 1) {
    deputy_index = 0;
  } else {
    deputy_index += 1;
  }
  // 设置处于展示的技能组
  active_skills.value = hero_data.value.skills![deputy_index];
  // 如果当前技能留空，则使用主技能
  active_skills.value.forEach((item, index) => {
    if (!item.name) {
      active_skills.value[index] = hero_data.value.skills![0][index];
    }
  });
  // 更新技能信息
  handleSelectSkill(current_index.value);
};
</script>

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
        <div class="border" v-show="current_index === index"></div>
      </transition>
      <img :src="item.img" @click="handleSelectSkill(index)" />
      <img :src="item.img" :class="{ active: current_index === index }" />
    </div>

    <!-- 底部内容 -->
    <i
      v-if="hero_data.skills!.length > 1"
      class="toggle iconfont wzry-qiehuan cursor-pointer"
      :class="{ 'hide-bottom': !show }"
      @click="handleToggleSkill"
      title="切换技能"
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

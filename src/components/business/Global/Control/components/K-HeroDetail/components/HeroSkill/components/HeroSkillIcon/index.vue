<script setup lang="ts">
import { ref, computed, onUnmounted } from "vue";

import { HeroDetailStore } from "@/store";
import { vMouseTip } from "@/directives";
import { $mouseTipText } from "@/config";
import { usePlayAudio } from "@/hooks";

const $emit = defineEmits<{
  "select-skill": [skills: Remote.Skill.Info];
}>();

const $heroDetail = HeroDetailStore();

const { playAudio } = usePlayAudio();

/** 主副技能索引 */
let deputy_index = 0;

/** 处于展示的技能索引 */
const current_index = ref(0);
/** 显示技能 */
const show = ref(false);
/** 展示的技能组 */
const active_skills = ref<Remote.Skill.Info[]>([]);

/** 处于展示的技能 */
const calcActiveSkill = computed(() => {
  return active_skills.value[current_index.value];
});

/* 当滚动到技能页，播放入场动画 */
$heroDetail.setScrollFn("skinIcon", (pageName) => {
  //只有当前页面未加载或者滚动到技能信息才会触发
  if (show.value || pageName !== "技能信息") return;
  show.value = true;
});

active_skills.value = $heroDetail.hero_info.skills[deputy_index];

/* 点击技能后传递索引号 */
const handleSelectSkill = (index: number) => {
  current_index.value = index;
  $heroDetail.skillToggler(index);
  $heroDetail.setSkillIndex(index);
  $emit("select-skill", calcActiveSkill.value);
  playAudio("n4r4");
};
handleSelectSkill(0);

/* 切换副技能 */
const handleToggleSkill = () => {
  //判断当前切换是否为最后一个副技能
  if (deputy_index === $heroDetail.hero_info.skills.length - 1) {
    deputy_index = 0;
  } else {
    deputy_index += 1;
  }

  //设置处于展示的技能组
  active_skills.value = $heroDetail.hero_info.skills[deputy_index];
  active_skills.value.forEach((item, index) => {
    //如果副技能留空，则使用主技能组的技能
    if (!item.name) {
      active_skills.value[index] = $heroDetail.hero_info.skills[0][index];
    }
  });

  handleSelectSkill(current_index.value);
  playAudio("n4r4");
};

onUnmounted(() => {
  $heroDetail.removeScrollFn("skinIcon");
});

defineExpose({
  _toggleSkill: handleToggleSkill,
});
</script>

<template>
  <div class="hero-skill-icon">
    <div
      v-for="(item, index) in active_skills"
      :key="index"
      v-mouse-tip="{
        text: $mouseTipText('kz53', { v: '技能' }),
      }"
      class="icon"
      :class="{ active: show }"
      :style="{
        'transition-delay': 0.05 * index + 's',
      }"
    >
      <!-- 技能选中圆圈 -->
      <transition name="border-fade">
        <div v-show="current_index === index" class="border"></div>
      </transition>

      <!-- 技能图标 -->
      <img :src="item.img" @click="handleSelectSkill(index)" />
      <img :src="item.img" :class="{ active: current_index === index }" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

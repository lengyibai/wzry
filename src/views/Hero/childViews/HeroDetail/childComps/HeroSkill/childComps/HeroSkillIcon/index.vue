<script setup lang="ts">
import { ref, computed, onUnmounted } from "vue";

import { AudioStore, HeroDetailStore } from "@/store";
import { $tip, $tool } from "@/utils";

interface Emits {
  (e: "select-skill", skills: Hero.Skill): void;
}
const emit = defineEmits<Emits>();

const $heroDetail = HeroDetailStore();
const $audioStore = AudioStore();

/** 主副技能索引 */
let deputy_index = 0;

const toggleRef = ref();

/** 处于展示的技能索引 */
const current_index = ref(0);
/** 显示技能 */
const show = ref(false);
/** 展示的技能组 */
const active_skills = ref<Hero.Skill[]>([]);

/** 设置英雄详情 */
const hero_data = computed(() => {
  return $heroDetail.hero_info;
});

//处于展示的技能
const calcActiveSkill = computed(() => {
  return active_skills.value[current_index.value];
});

/* 当滚动到技能页，播放出场动画 */
$heroDetail.setScollFn("skinIcon", (index) => {
  if (show.value || index !== 2) return;
  show.value = true;

  const length = hero_data.value.skills!.length;
  if (length > 1) {
    setTimeout(() => {
      const toggleFocus = new $tool.FocusElement(toggleRef.value);

      $tip({
        align: "right-top",
        text: `${hero_data.value.name}存在${
          length == 3 ? "三" : "两"
        }套技能，页面底部中间有个切换副技能的按钮，点击它吧！由于图片资源条件有限，副技能的被动图标都会带有文字，没有文字的就是主技能。`,
        createFn: () => {
          toggleFocus.focus();
        },
        btnFn: () => {
          toggleFocus.blur();
        },
      });
    }, 500);
  }
});

active_skills.value = hero_data.value.skills![deputy_index];

/* 点击技能后传递索引号 */
const handleSelectSkill = (index: number) => {
  current_index.value = index;
  $heroDetail.skillToggler(index);
  $heroDetail.setSkillIndex(index);
  emit("select-skill", calcActiveSkill.value);
  $audioStore.play("n4r4");
};
handleSelectSkill(0);

/* 切换副技能 */
const handleToggleSkill = () => {
  //判断当前切换是否为最后一个副技能
  if (deputy_index === hero_data.value.skills!.length - 1) {
    deputy_index = 0;
  } else {
    deputy_index += 1;
  }
  //设置处于展示的技能组
  active_skills.value = hero_data.value.skills![deputy_index];
  //如果当前技能留空，则使用主技能
  active_skills.value.forEach((item, index) => {
    if (!item.name) {
      active_skills.value[index] = hero_data.value.skills![0][index];
    }
  });

  //更新技能信息
  handleSelectSkill(current_index.value);
  $audioStore.play("n4r4");
};

onUnmounted(() => {
  $heroDetail.removeScollFn("skinIcon");
});
</script>

<template>
  <div class="hero-skill-icon">
    <div
      v-for="(item, index) in active_skills"
      ref="skillImg"
      :key="index"
      class="icon cursor-pointer"
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
      <img :src="item.img" @dragstart.prevent @click="handleSelectSkill(index)" />
      <img :src="item.img" :class="{ active: current_index === index }" @dragstart.prevent />
    </div>

    <!-- 切换副技能 -->
    <i
      v-if="hero_data.skills!.length > 1"
      ref="toggleRef"
      class="toggle iconfont wzry-qiehuan cursor-pointer"
      :class="{ 'hide-bottom': !show }"
      title="切换技能"
      @click="handleToggleSkill"
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

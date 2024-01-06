<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

import HeroSkillIcon from "./childComps/HeroSkillIcon/index.vue";
import HeroSkillContent from "./childComps/HeroSkillContent/index.vue";

import { KScrollTip } from "@/components/business";
import { HeroDetailStore } from "@/store";
import { $tip, $tool } from "@/utils";
import { vMouseTip } from "@/directives";
import { MOUSE_TIP } from "@/config";

const { hero_info } = storeToRefs(HeroDetailStore());
const { setScollFn } = HeroDetailStore();

const heroSkillIconRef = ref<InstanceType<typeof HeroSkillIcon>>();

const toggleRef = ref<HTMLElement>();

/** 显示技能切换图标 */
const show = ref(false);
/** 技能信息 */
const hero_skill = ref<Remote.Skill.Info>();

/* 当滚动到技能页，播放出场动画 */
setScollFn("skinIcon", (pageName) => {
  //只有当前页面未加载或者滚动索引为3才会触发
  if (show.value || pageName !== "技能信息") return;
  show.value = true;

  //存在多套技能执行下列代码
  const length = hero_info.value.skills.length;
  if (length > 1) {
    setTimeout(() => {
      if (!toggleRef.value) return;
      const toggleFocus = new $tool.FocusElement(toggleRef.value);

      $tip({
        align: "right-top",
        text: `${hero_info.value.name}存在${
          length == 3 ? "三" : "两"
        }套技能，页面底部中间有个切换副技能的按钮，点击它吧！`,
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

/* 选择技能 */
const onSelectSkill = (skill: Remote.Skill.Info) => {
  setTimeout(() => {
    hero_skill.value = skill;
  }, 375);
};
</script>

<template>
  <div class="hero-skill">
    <!--技能图标-->
    <HeroSkillIcon ref="heroSkillIconRef" @select-skill="onSelectSkill" />

    <!--主体内容-->
    <transition name="fade">
      <HeroSkillContent v-if="hero_skill" :skill="hero_skill" />
    </transition>

    <!-- 可滚动提示 -->
    <KScrollTip ref="downRef" />

    <!-- 切换副技能 -->
    <i
      v-if="hero_info.skills!.length > 1"
      ref="toggleRef"
      v-mouse-tip="{
        text: MOUSE_TIP.wk12,
      }"
      class="toggle iconfont wzry-qiehuan"
      :class="{ 'hide-bottom': !show }"
      @click="heroSkillIconRef?.toggleSkill"
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

import { HeroDetailStore } from "@/store";
import { $tool, $tip } from "@/utils";
import { MOUSE_TIP } from "@/config";
import { vMouseTip } from "@/directives";

const $emit = defineEmits<{
  toggle: [];
}>();

const { hero_info } = storeToRefs(HeroDetailStore());
const { setScrollFn } = HeroDetailStore();

const toggleRef = ref<HTMLElement>();

/** 显示技能切换图标 */
const show = ref(false);
/** 主副技能索引 */
const deputy_index = ref(0);

/* 当滚动到技能页，播放入场动画 */
setScrollFn("skinIcon", (pageName) => {
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
        }套技能，页面右下角有个切换副技能的按钮，点击它吧！`,
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

/* 切换副技能 */
const handleToggleSkill = () => {
  $emit("toggle");
  //判断当前切换是否为最后一个副技能
  if (deputy_index.value === hero_info.value.skills.length - 1) {
    deputy_index.value = 0;
  } else {
    deputy_index.value += 1;
  }
};
</script>

<template>
  <div ref="toggleRef" class="hero-skill-toggle" :class="{ 'hide-bottom': !show }">
    <div class="status">{{ deputy_index + 1 }}/{{ hero_info.skills.length }}</div>
    <i
      ref="toggleRef"
      v-mouse-tip="{
        text: MOUSE_TIP.wk12,
      }"
      class="toggle iconfont wzry-qiehuan"
      @click="handleToggleSkill"
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

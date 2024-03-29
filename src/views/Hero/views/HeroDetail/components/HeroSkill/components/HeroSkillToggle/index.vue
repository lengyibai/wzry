<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

import { HeroDetailStore } from "@/store";
import { $tip, $focus } from "@/utils";
import { $tipText, MOUSE_TIP } from "@/config";
import { vMouseTip } from "@/directives";

const $emit = defineEmits<{
  toggle: [];
}>();

const $heroDetailStore = HeroDetailStore();

const { hero_info } = storeToRefs($heroDetailStore);

const toggleRef = ref<HTMLElement>();

/** 显示技能切换图标 */
const show = ref(false);
/** 主副技能索引 */
const deputy_index = ref(0);

/* 当滚动到技能页，播放入场动画 */
$heroDetailStore.setScrollFn("skinIcon", (pageName) => {
  if (show.value || pageName !== "技能信息") return;
  show.value = true;

  //存在多套技能执行下列代码
  const length = hero_info.value.skills.length;
  if (length > 1) {
    setTimeout(() => {
      if (!toggleRef.value) return;

      $tip({
        align: "right-top",
        color: false,
        text: $tipText("le13", { h: hero_info.value.name, c: length == 3 ? "三" : "两" }),
        createFn() {
          $focus.show(toggleRef.value!);
        },
        btnFn: $focus.close,
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

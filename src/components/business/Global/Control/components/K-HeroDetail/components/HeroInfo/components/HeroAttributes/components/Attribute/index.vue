<script setup lang="ts">
import { ref } from "vue";

import { _getMiscLink } from "@/utils/concise";

interface Props {
  /** 属性名 */
  attr: keyof Game.Hero.SkillKey;
  /** 长度 */
  length: number;
}

const $props = defineProps<Props>();

/** 用于延迟显示进度过渡动画 */
const len = ref(0);

/** 背景色 */
const bgc: Record<string, string> = {
  survival: "#1081d2",
  attack: "#d3b95b",
  effect: "#55c06b",
  difficulty: "#d3422b",
};

/** 描述 */
const text: Game.Hero.SkillKey = {
  survival: "生存能力",
  attack: "攻击伤害",
  effect: "技能效果",
  difficulty: "上手难度",
};

setTimeout(() => {
  len.value = $props.length;
}, 2000);
</script>

<template>
  <div class="attribute">
    <span class="label">{{ text[attr] }}</span>
    <div class="bar">
      <div
        class="bar-inner"
        :style="{
          backgroundColor: bgc[attr],
          height: len + '%',
        }"
      ></div>
    </div>
    <div
      class="ico"
      :class="attr"
      :style="{
        backgroundImage: `url(${_getMiscLink('attribute')})`,
      }"
    ></div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

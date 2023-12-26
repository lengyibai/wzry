<script setup lang="ts">
interface Props {
  /** 属性名 */
  attr: keyof Game.Hero.SkillKey;
  /** 长度 */
  length: number;
}

defineProps<Props>();

/** 精灵图坐标 */
const y: Record<string, string> = {
  survival: "0 0px",
  attack: "-3.75rem 0rem",
  effect: "-7.5rem 0rem",
  difficulty: "-11.25rem 0rem",
};

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
</script>

<template>
  <div class="attribute">
    <span class="label">{{ text[attr] }}</span>
    <div class="bar">
      <div
        class="bar-inner"
        :style="{
          backgroundColor: bgc[attr],
          height: length + '%',
        }"
      ></div>
    </div>
    <div class="ico" :style="{ backgroundPosition: y[attr] }"></div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

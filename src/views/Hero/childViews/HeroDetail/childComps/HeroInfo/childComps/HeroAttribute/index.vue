<script setup lang="ts">
import { onMounted, ref } from "vue";

interface Props {
  /** 属性名 */
  attr: keyof Hero.SkillKey;
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
const text: Hero.SkillKey = {
  survival: "生存能力",
  attack: "攻击伤害",
  effect: "技能效果",
  difficulty: "上手难度",
};
/** 属性元素 */
const attributeRef = ref<HTMLElement>();

onMounted(() => {
  if (!attributeRef.value) return;
  attributeRef.value.style.width = "100%";
});
</script>

<template>
  <div ref="attributeRef" class="attribute">
    <span>{{ text[attr] }}</span>
    <div class="ico" :style="{ backgroundPosition: y[attr] }"></div>
    <div class="bar">
      <i
        :style="{
          backgroundColor: bgc[attr],
          width: length + '%',
        }"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

<script setup lang="ts">
import { onMounted, ref } from "vue";

interface Text extends Record<string, string> {
  survival: string; //生存能力
  attack: string; //攻击伤害
  effect: string; //技能效果
  difficulty: string; //上手难度
}

interface Props {
  attr: string; //属性名
  length: number; //长度
}
defineProps<Props>();

//精灵图坐标
const y: Record<string, string> = {
  survival: "0 0px",
  attack: "-60px 0px",
  effect: "-120px 0px",
  difficulty: "-180px 0px",
};

//背景色
const bgc: Record<string, string> = {
  survival: "#1081d2",
  attack: "#d3b95b",
  effect: "#55c06b",
  difficulty: "#d3422b",
};

//描述
const text: Text = {
  survival: "生存能力",
  attack: "攻击伤害",
  effect: "技能效果",
  difficulty: "上手难度",
};

const attribute = ref(); //属性元素

//延迟显示英雄属性
onMounted(() => {
  attribute.value.style.width = "100%";
});
</script>

<template>
  <div ref="attribute" class="attribute">
    <span>{{ $t(text[attr]) }}</span>
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

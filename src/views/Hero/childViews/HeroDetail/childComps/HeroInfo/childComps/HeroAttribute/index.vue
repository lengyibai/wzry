<script setup lang="ts">
import { onMounted, ref } from "vue";

interface Props {
  attr: string;
  length: string;
}
const props = withDefaults(defineProps<Props>(), {
  attr: "",
  length: "0%",
});

const y: Record<string, string> = {
  survival: "0 0px",
  attack: "-60px 0px",
  effect: "-120px 0px",
  difficulty: "-180px 0px",
};
const bgc: Record<string, string> = {
  survival: "#1081d2",
  attack: "#d3b95b",
  effect: "#55c06b",
  difficulty: "#d3422b",
};

interface Text extends Record<string, string> {
  survival: string;
  attack: string;
  effect: string;
  difficulty: string;
}

const text: Text = {
  survival: "生存能力",
  attack: "攻击伤害",
  effect: "技能效果",
  difficulty: "上手难度",
};

const attribute = ref(); //属性元素
const progress = ref("0%"); //进度条

onMounted(() => {
  setTimeout(() => {
    progress.value = props.length;
    attribute.value.style.transform = "translateY(calc(var(--i) * 250%))";
    attribute.value.style.width = "100%";
  });
});
</script>

<template>
  <div class="attribute" ref="attribute">
    <span>{{ text[attr] }}</span>
    <div class="ico" :style="{ backgroundPosition: y[attr] }"></div>
    <div class="bar">
      <i
        :style="{
          backgroundColor: bgc[attr],
          width: progress + '%',
        }"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

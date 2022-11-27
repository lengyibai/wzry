<template>
  <div class="attribute">
    <span>{{ text[attr] }}</span>
    <div class="ico" :style="{ backgroundPosition: y[attr] }"></div>
    <div class="bar">
      <i
        :style="{
          backgroundColor: bgc[attr],
          width: progress,
        }"
      />
    </div>
  </div>
</template>
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

const progress = ref("0%");

const y: Record<string, string> = {
  survival: "0 0px",
  attack: "-30px 0px",
  effect: "-60px 0px",
  difficulty: "-90px 0px",
};
const bgc: Record<string, string> = {
  survival: "#1c8fea",
  attack: "#e7ca63",
  effect: "#5dd473",
  difficulty: "#e84a33",
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

onMounted(() => {
  setTimeout(() => {
    progress.value = props.length;
  }, 500);
});
</script>
<style scoped lang="less">
@import url("./index.less");
</style>

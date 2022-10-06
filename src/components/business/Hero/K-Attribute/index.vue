<template>
  <div class="K-Attribute">
    <span>{{ text[attr] }}</span>
    <div class="ico" :style="{ backgroundPosition: y[attr] }"></div>
    <div class="bar">
      <i
        :style="{
          backgroundColor: bgc[attr],
          width: progress,
        }"
      ></i>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, toRefs } from 'vue';

const props = defineProps({
  attr: {
    type: String,
    default: '',
  },
  length: {
    type: Number,
    default: 0,
  },
});
const { length } = toRefs(props);

const progress = ref('0%');
const y = {
  survival: '0 -170px',
  attack: '-30px -170px',
  effect: '-60px -170px',
  difficulty: '-90px -170px',
};
const bgc = {
  survival: '#1c8fea',
  attack: '#e7ca63',
  effect: '#5dd473',
  difficulty: '#e84a33',
};
const text = {
  survival: '生存能力',
  attack: '攻击伤害',
  effect: '技能效果',
  difficulty: '上手难度',
};

onMounted(() => {
  setTimeout(() => {
    progress.value = `${length.value}%`;
  }, 500);
});
</script>
<style scoped lang="less">
@import './index.less';
</style>

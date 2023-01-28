<script setup lang="ts">
import { ref, onMounted } from "vue";

interface Props {
  heroData: Hero.Data; //英雄信息
}
const props = defineProps<Props>();

// 英雄信息整合
const hero_info: (string | number)[][] = [
  [props.heroData.profession.join("/"), "profession", "游戏职业"],
  [props.heroData.location, "location", "细分定位"],
  [props.heroData.specialty.join("/"), "specialty", "游戏特长"],
  [props.heroData.period, "period", "强势时期"],
  [props.heroData.camp, "camp", "阵营"],
  [props.heroData.height, "height", "身高"],
  [props.heroData.identity, "identity", "身份"],
];

const info = ref();

onMounted(() => {
  //设置按顺序出场的动画
  setTimeout(() => {
    info.value.forEach((item: HTMLElement, index: number) => {
      item.style.transitionDelay = `${index / 14}s`;
      setTimeout(() => {
        item.style.transform = "translateX(0)";
        item.style.opacity = "1";
      });
    });
  }, 1500);
});
</script>

<template>
  <div class="hero-basic">
    <span v-for="(item, index) in hero_info" ref="info" :key="index" class="info">
      <i class="iconfont" :class="'wzry-' + item[1]" />
      <span class="label">{{ item[2] }}：</span>
      <span class="name">{{ item[0] || "未知" }}</span>
    </span>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

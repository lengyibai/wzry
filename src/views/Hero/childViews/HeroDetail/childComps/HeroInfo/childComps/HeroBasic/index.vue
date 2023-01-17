<script setup lang="ts">
import { heroDefault } from "@/defaultValue";
import { ref, onMounted } from "vue";

interface Props {
  heroData: Hero.Data;
}
const props = withDefaults(defineProps<Props>(), {
  heroData: () => heroDefault,
});

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
  }, 1000);
});
</script>

<template>
  <div class="hero-basic">
    <span
      class="info"
      ref="info"
      v-for="(item, index) in hero_info"
      :key="index"
    >
      <i class="iconfont" :class="'wzry-' + item[1]" />
      <span class="label">{{ item[2] }}：</span>
      <span class="name">{{ item[0] || "未知" }}</span>
    </span>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

<template>
  <div class="hero-detail-basic-info" ref="HeroDetailBasicInfo">
    <div class="name">
      <span>{{ hero_data.name || "未知" }}</span>
      <div class="box">
        <span>{{ hero_data.mark || "未知" }}</span>
        <span>BACKGROUND</span>
      </div>
    </div>
    <div class="info" ref="info" v-for="(item, index) in hero_info" :key="index">
      <i class="iconfont" :class="'wzry-' + item[1]"></i>
      {{ item[2] + "：" + item[0] || "未知" }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { $deepCopy } from "@/utils";
import { heroDefault } from "@/defaultValue/defaults";
import heroStore from "@/store/hero";

const $heroStore = heroStore();
const hero_data = ref<typeof heroDefault>($deepCopy(heroDefault)); //英雄数据
hero_data.value = $heroStore.hero_info;

const HeroDetailBasicInfo = ref();

type HeroInfo = string | undefined;
const hero_info: HeroInfo[][] = [
  [hero_data.value.location, "location", "定位"],
  [hero_data.value.specialty.join("/"), "specialty", "特长"],
  [hero_data.value.period, "period", "时期"],
  [hero_data.value.camp, "camp", "阵营"],
  [hero_data.value.height, "height", "身高"],
];

onMounted(() => {
  /* 设置按顺序出场的动画 */
  const list = HeroDetailBasicInfo.value.querySelectorAll(".info");
  list.forEach((item: HTMLElement, index: number) => {
    item.style.transitionDelay = `${index / 10}s`;
    setTimeout(() => {
      item.style.transform = "translateX(0)";
      item.style.opacity = "1";
    }, 250);
  });
});
</script>
<style scoped lang="less">
@import url("./index.less");
</style>

<script setup lang="ts">
import { ref, watchEffect, onMounted } from "vue";

import { HeroDetailStore } from "@/store";
import { vAnimateNumber } from "@/directives";

const $heroDetail = HeroDetailStore();

const infoRef = ref<HTMLElement[]>();
const hero_data = ref<unknown>([]);

watchEffect(() => {
  const hero = $heroDetail.hero_info;

  hero_data.value = [
    [hero.profession.join("/"), "profession", "游戏职业"],
    [hero.location, "location", "细分定位"],
    [hero.specialty.join("/"), "specialty", "游戏特长"],
    [hero.period, "period", "强势时期"],
    [hero.camp, "camp", "阵营"],
    [hero.height, "height", "身高"],
    [hero.identity, "identity", "身份"],
  ];
});

onMounted(() => {
  //设置按顺序入场的动画
  setTimeout(() => {
    infoRef.value?.forEach((item: HTMLElement, index: number) => {
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
    <span v-for="(item, index) in hero_data" ref="infoRef" :key="index" class="info">
      <i class="iconfont" :class="`wzry-${item[1]}`" />
      <span class="label">{{ item[2] }}：</span>
      <span
        v-animate-number="{
          num: item[0],
          duration: 3000,
          once: false,
          format: (v) => {
            return v + 'cm';
          },
        }"
        class="name"
      >
      </span>
    </span>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

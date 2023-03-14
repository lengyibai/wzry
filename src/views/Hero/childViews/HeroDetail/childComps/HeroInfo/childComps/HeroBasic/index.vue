<script setup lang="ts">
import { ref, watchEffect, onMounted } from "vue";

import { heroDetailStore } from "@/store";

const $heroDetail = heroDetailStore();

const info = ref();
const hero_data = ref<any>([]);

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
    <span v-for="(item, index) in hero_data" class="info" ref="info" :key="index">
      <i class="iconfont" :class="'wzry-' + item[1]" />
      <span class="label">{{ $t(item[2]) }}：</span>
      <span class="name">{{ item[0] || "未知" }}</span>
    </span>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

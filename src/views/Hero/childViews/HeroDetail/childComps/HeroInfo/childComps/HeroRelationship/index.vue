<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";

import heroDetail from "@/store/heroDetail";
import { getHeroDetail } from "@/api/modules/games/hero";

const $heroDetail = heroDetail();
const $router = useRouter();

const relationship = ref();

/* 切换英雄信息 */
const toggleHero = (id: number) => {
  getHeroDetail(id).then((hero) => {
    $heroDetail.setHeroInfo(hero);
    $router.replace({
      path: "/hero",
      query: {
        id: hero.id,
      },
    });
  });
};

defineExpose({
  el: relationship,
});
</script>

<template>
  <div class="hero-relationship" ref="relationship">
    <transition-group name="fade-a">
      <button
        v-for="item in $heroDetail.hero_info.relationships"
        class="relation"
        @click="toggleHero(item.id)"
        :key="item.id"
      >
        <img :src="item.hero.headImg" alt="" @dragstart.prevent />
        <span class="name">{{ item.relation }}</span>
      </button>
    </transition-group>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

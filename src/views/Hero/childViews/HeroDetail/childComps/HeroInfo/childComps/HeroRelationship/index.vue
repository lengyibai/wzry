<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";

import { Store } from "@/store";
import { API_HERO } from "@/api";

const $heroDetail = Store.heroDetail();
const $router = useRouter();

const relationship = ref();

/* 切换英雄信息 */
const toggleHero = (id: number) => {
  API_HERO.getHeroDetail(id).then((hero) => {
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
  <div ref="relationship" class="hero-relationship">
    <transition-group name="fade-a">
      <button
        v-for="item in $heroDetail.hero_info.relationships"
        :key="item.id"
        class="relation"
        @click="toggleHero(item.id)"
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

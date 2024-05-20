<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";

import { RelationshipCircle } from "./helper/RelationshipCircle";

import { HeroDetailStore } from "@/store";
import { GAME_HERO } from "@/api";
import { _cloneDeep } from "@/utils/tool";

const $heroDetailStore = HeroDetailStore();

let relationshipCircle: RelationshipCircle;

const heroRelationshipsRef = ref<HTMLElement>();

const active_id = ref(0);

/* 切换英雄信息 */
const toggleHero = async (id: number) => {
  const hero = await GAME_HERO.getHeroDetail(id);
  $heroDetailStore.setHeroInfo(hero);
  const { relationships } = $heroDetailStore.hero_info;

  relationshipCircle.toggleRelations(relationships);
  $heroDetailStore.resetStatus();
};
onMounted(() => {
  const {
    id,
    name: heroName,
    avatar: avatar,
    relationships: _relationships,
  } = $heroDetailStore.hero_info;

  const relationships = _cloneDeep(_relationships);
  relationships.unshift({
    id,
    relation: "",
    desc: "",
    heroName,
    avatar,
  });

  relationshipCircle = new RelationshipCircle({
    parentElement: heroRelationshipsRef.value!,
    currentHeroId: id,
    currentHeroName: heroName,
    relationships,
    lineWidth: 250,
    clickFn: toggleHero,
    hoverFn: (data) => {
      active_id.value = data.id;
      $heroDetailStore.setRelationInfo(data);
    },
  });
});

onUnmounted(() => {
  relationshipCircle.destruction();
});
</script>

<template>
  <div ref="heroRelationshipsRef" class="hero-relationships"></div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

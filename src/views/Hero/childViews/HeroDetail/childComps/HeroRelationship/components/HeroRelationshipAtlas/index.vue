<script setup lang="ts">
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import _cloneDeep from "lodash/cloneDeep";
import { onUnmounted } from "vue";

import { RelationshipCircle } from "./helper/RelationshipCircle";

import { HeroDetailStore } from "@/store";
import { GAME_HERO } from "@/api";

const $router = useRouter();
const { hero_info } = storeToRefs(HeroDetailStore());
const $heroDetailStore = HeroDetailStore();

let relationshipCircle: RelationshipCircle;

const heroRelationshipsRef = ref<HTMLElement>();

const active_id = ref(0);

/* 切换英雄信息 */
const toggleHero = (id: number) => {
  const hero = GAME_HERO.getHeroDetail(id);
  $heroDetailStore.setHeroInfo(hero);
  $router.replace({
    path: "/hero",
    query: {
      id: hero.id,
    },
  });
  const { relationships } = hero_info.value;

  relationshipCircle.toggleRelations(relationships);
  $heroDetailStore.resetStatus();
};
onMounted(() => {
  const { id, name: heroName, avatar: avatar, relationships: _relationships } = hero_info.value;
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

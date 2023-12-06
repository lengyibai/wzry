<script setup lang="ts">
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import _cloneDeep from "lodash/cloneDeep";

import { RelationshipCircle } from "./hooks/utils";

import { HeroDetailStore } from "@/store";
import { API_HERO } from "@/api";

const $router = useRouter();
const { hero_info } = storeToRefs(HeroDetailStore());
const $heroDetailStore = HeroDetailStore();

let relationshipCircle: RelationshipCircle;

const heroRelationshipsRef = ref<HTMLElement>();

const active_id = ref(0);

/* 切换英雄信息 */
const toggleHero = (id: number) => {
  API_HERO.getHeroDetail(id).then((hero) => {
    $heroDetailStore.setHeroInfo(hero);
    $router.replace({
      path: "/hero",
      query: {
        id: hero.id,
      },
    });
    const { relationships } = hero_info.value;

    relationshipCircle.toggleRelations(relationships);
    $heroDetailStore.setRelationInfo();
  });
};
onMounted(() => {
  const { id, name: heroName, headImg: headImage, relationships: _relationships } = hero_info.value;
  const relationships = _cloneDeep(_relationships);
  relationships.unshift({
    id,
    relation: "",
    desc: "",
    heroName,
    headImage,
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
</script>

<template>
  <div ref="heroRelationshipsRef" class="hero-relationships"></div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

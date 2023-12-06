<script setup lang="ts">
import { storeToRefs } from "pinia";

import { HeroDetailStore } from "@/store";

const { hero_info, relation_info } = storeToRefs(HeroDetailStore());
</script>

<template>
  <div class="hero-relation-desc">
    <div class="self">
      <div class="info">
        <img :src="hero_info.headImg" alt="" class="avatar" />
        <div class="relation">
          <div class="name">{{ hero_info?.name }}</div>
          <div class="desc">{{ relation_info?.heroName }}的{{ relation_info?.replyRelation }}</div>
        </div>
      </div>
      <div
        class="say"
        :class="hero_info?.gender === '女' && 'nv'"
        :data-text="`${hero_info.name}：${relation_info?.desc!}`"
      >
        {{ hero_info.name }}：{{ relation_info?.desc }}
      </div>
    </div>
    <div class="reply">
      <div class="info">
        <img :src="relation_info?.headImage" alt="" class="avatar" />
        <div class="relation">
          <div class="name">{{ relation_info?.heroName }}</div>
          <div class="desc">{{ hero_info.name }}的{{ relation_info?.relation }}</div>
        </div>
      </div>
      <div
        class="say"
        :class="relation_info?.replyGender"
        :data-text="`${relation_info?.heroName}：${relation_info?.reply!}`"
      >
        {{ relation_info?.heroName }}：{{ relation_info?.reply }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import HeroTitle from "./childComps/HeroTitle/index.vue"; //英雄标题
import HeroBasic from "./childComps/HeroBasic/index.vue"; //英雄基础信息
import HeroRelationship from "./childComps/HeroRelationship/index.vue";
import HeroAttribute from "./childComps/HeroAttribute/index.vue"; //英雄属性

import heroDetail from "@/store/heroDetail";

const $heroDetail = heroDetail();

const into = ref(false); //控制页面元素显示
const hero_data = $heroDetail.hero_info; //英雄数据

onMounted(() => {
  //设置按顺序出场的动画
  setTimeout(() => {
    into.value = true;
  }, 1500);
});
</script>

<template>
  <div class="hero-material-skins" ref="HeroMaterialSkins">
    <!-- 英雄标题 -->
    <HeroTitle
      :class="{ show: !into }"
      :name="hero_data.name"
      :mark="hero_data.mark"
    />

    <!-- 基础信息表 -->
    <div class="basic-info">
      <HeroBasic :hero-data="hero_data" />

      <!-- 关系 -->
      <transition name="scale">
        <HeroRelationship
          :relationship="hero_data.relationships"
          v-if="into && hero_data.relationships"
        />
      </transition>
    </div>

    <!-- 属性 -->
    <transition name="fade">
      <div class="hero-attribute" v-if="into">
        <HeroAttribute
          style="--i: 0"
          class="attribute"
          attr="survival"
          :length="hero_data.survival"
        />
        <HeroAttribute
          style="--i: 1"
          class="attribute"
          attr="attack"
          :length="hero_data.attack"
        />
        <HeroAttribute
          style="--i: 2"
          class="attribute"
          attr="effect"
          :length="hero_data.effect"
        />
        <HeroAttribute
          style="--i: 3"
          class="attribute"
          attr="difficulty"
          :length="hero_data.difficulty"
        />
      </div>
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

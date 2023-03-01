<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

import HeroTitle from "./childComps/HeroTitle/index.vue"; //英雄标题
import HeroBasic from "./childComps/HeroBasic/index.vue"; //英雄基础信息
import HeroRelationship from "./childComps/HeroRelationship/index.vue"; //英雄关系
import HeroAttribute from "./childComps/HeroAttribute/index.vue"; //英雄属性

import switchStore from "@/store/switch";
import heroDetail from "@/store/heroDetail";

const $heroDetail = heroDetail();
const $switchStore = switchStore();

const into = ref(false); //控制页面元素显示
const hero_data = computed(() => $heroDetail.hero_info); //英雄数据

onMounted(() => {
  //设置按顺序出场的动画
  setTimeout(() => {
    into.value = true;
    $switchStore.$tip({
      text: "05su",
      align: "right-bottom",
    });

    setTimeout(() => {
      $switchStore.$tip({ text: "0vk2", align: "right-bottom" });
    }, 10000);
  }, 1000);
});
</script>

<template>
  <div class="basic-info">
    <!-- 英雄标题 -->
    <HeroTitle :class="{ show: !into }" />

    <div class="content">
      <div class="left">
        <HeroBasic class="hero-basic" />

        <!-- 属性 -->
        <transition name="attribute">
          <div v-if="into" class="hero-attribute1">
            <HeroAttribute class="attribute" attr="survival" :length="hero_data.survival" />
            <HeroAttribute class="attribute" attr="attack" :length="hero_data.attack" />
            <HeroAttribute class="attribute" attr="effect" :length="hero_data.effect" />
            <HeroAttribute class="attribute" attr="difficulty" :length="hero_data.difficulty" />
          </div>
        </transition>
      </div>
      <div class="right">
        <!-- 关系 -->
        <transition name="relationship">
          <HeroRelationship v-if="into" />
        </transition>

        <!-- 属性 -->
        <transition name="attribute">
          <div v-if="into" class="hero-attribute2">
            <HeroAttribute class="attribute" attr="survival" :length="hero_data.survival" />
            <HeroAttribute class="attribute" attr="attack" :length="hero_data.attack" />
            <HeroAttribute class="attribute" attr="effect" :length="hero_data.effect" />
            <HeroAttribute class="attribute" attr="difficulty" :length="hero_data.difficulty" />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

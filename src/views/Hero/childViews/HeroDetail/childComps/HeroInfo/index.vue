<template>
  <div class="hero-material-skins" ref="HeroMaterialSkins">
    <!-- 英雄标题 -->
    <HeroTitle :name="hero_data.name" :mark="hero_data.mark" />

    <!-- 主体 -->
    <div class="content">
      <!-- 左侧 -->
      <div class="content-left scroll-white" @mousewheel.stop>
        <!-- 基础信息表 -->
        <div class="basic-info">
          <HeroBasic :heroData="hero_data" />

          <!-- 关系 -->
          <transition name="fade">
            <HeroRelationship :relationship="hero_data.relationship" v-if="into" />
          </transition>
        </div>

        <!-- 属性 -->
        <transition name="fade">
          <div class="hero-attribute" v-if="into">
            <HeroAttribute style="--i: 0" class="attribute" attr="survival" :length="hero_data.survival" />
            <HeroAttribute style="--i: 1" class="attribute" attr="attack" :length="hero_data.attack" />
            <HeroAttribute style="--i: 2" class="attribute" attr="effect" :length="hero_data.effect" />
            <HeroAttribute style="--i: 3" class="attribute" attr="difficulty" :length="hero_data.difficulty" />
          </div>
        </transition>
      </div>

      <!-- 英雄语音 -->
      <HeroVoice :voices="hero_data.voices" v-if="into && hero_data.voices?.length" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { $deepCopy } from "@/utils";
import { heroDefault } from "@/defaultValue/defaults";
import heroStore from "@/store/hero";
import HeroTitle from "./childComps/HeroTitle/index.vue"; //英雄标题
import HeroBasic from "./childComps/HeroBasic/index.vue"; //英雄基础信息
import HeroRelationship from "./childComps/HeroRelationship/index.vue";
import HeroAttribute from "./childComps/HeroAttribute/index.vue"; //英雄属性
import HeroVoice from "./childComps/HeroVoice/index.vue"; //英雄语音

const into = ref(false); //控制页面元素显示
const $heroStore = heroStore();
const hero_data = ref<typeof heroDefault>($deepCopy(heroDefault)); //英雄数据
hero_data.value = $heroStore.hero_info;

onMounted(() => {
  /* 设置按顺序出场的动画 */
  setTimeout(() => {
    into.value = true;
  }, 1000);
});
</script>
<style scoped lang="less">
@import url("./index.less");
</style>

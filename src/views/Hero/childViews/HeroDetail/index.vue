<template>
  <div class="hero-detail">
    <LibMaskClose @close="hide" />
    <!--资料皮肤-->
    <HeroDetailParallaxBg :bg="hero_data.poster">
      <HeroMaterialSkins />
    </HeroDetailParallaxBg>

    <!--技能-->
    <HeroDetailParallaxBg :bg="hero_data.poster" v-if="hero_data.skills">
      <HeroSkill />
    </HeroDetailParallaxBg>

    <!--故事-->
    <HeroDetailParallaxBg :bg="hero_data.poster" v-if="hero_data.gamestory">
      <HeroStory />
    </HeroDetailParallaxBg>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import heroStore from "@/store/hero";
import HeroDetailParallaxBg from "./childComps/HeroDetailParallaxBg/index.vue"; //滚动视差背景
import HeroMaterialSkins from "./childComps/HeroMaterialSkins/index.vue"; //资料、皮肤页
import HeroSkill from "./childComps/HeroSkill/index.vue"; //技能页
import HeroStory from "./childComps/HeroStory/index.vue"; //历史页

interface Emits {
  (e: "update:modelValue", v: boolean): void;
}

const emit = defineEmits<Emits>();

const $router = useRouter();
const $heroStore = heroStore();

const hero_data = $heroStore.hero_info; //英雄信息

/* 隐藏自身 */
const hide = () => {
  emit("update:modelValue", false);
  $router.replace("/hero");
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>

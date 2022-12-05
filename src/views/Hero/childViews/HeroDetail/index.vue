<template>
  <div class="hero-detail">
    <LibMaskClose @close="hide" />
    <LibFullScroll>
      <!--资料皮肤-->
      <HeroParallax class="scroll-item" :bg="hero_data.poster">
        <HeroInfo />
      </HeroParallax>

      <!--皮肤-->
      <HeroParallax class="scroll-item" :bg="hero_data.poster" v-if="hero_data.skins.length">
        <HeroSkin />
      </HeroParallax>

      <!--技能-->
      <HeroParallax class="scroll-item" :bg="hero_data.skins[1].poster" v-if="hero_data.skills.length">
        <HeroSkill />
      </HeroParallax>

      <!--故事-->
      <HeroParallax
        class="scroll-item"
        :bg="hero_data.skins[2] ? hero_data.skins[2].poster : hero_data.poster"
        v-if="hero_data.gamestory"
      >
        <HeroStory />
      </HeroParallax>
    </LibFullScroll>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import heroStore from "@/store/hero";
import HeroParallax from "./childComps/HeroParallax/index.vue"; //滚动视差背景
import HeroInfo from "./childComps/HeroInfo/index.vue"; //资料
import HeroSkin from "./childComps/HeroSkin/index.vue"; //皮肤鉴赏
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

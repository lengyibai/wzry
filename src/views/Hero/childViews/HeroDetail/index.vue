<template>
  <div class="hero-detail">
    <!-- 顶部关闭 -->
    <LibMaskClose @close="hide" />
    <LibFullScroll v-model="scroll_index">
      <!--资料皮肤-->
      <HeroParallax class="scroll-item" :bg="hero_data.poster">
        <HeroInfo />
      </HeroParallax>

      <!--皮肤-->
      <HeroParallax class="scroll-item" :bg="hero_data.poster" v-if="hero_data.skins.length">
        <HeroSkin />
      </HeroParallax>

      <!--技能-->
      <HeroParallax
        class="scroll-item"
        :bg="hero_data.skins[hero_data.skins.length - 1].poster"
        v-if="hero_data.skills.length"
      >
        <HeroSkill />
      </HeroParallax>
    </LibFullScroll>

    <!-- 滚动进度 -->
    <Heroprogress :index="scroll_index" :pageName="page_name" @toggle="toggle" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import heroStore from "@/store/hero";
import HeroParallax from "./childComps/HeroParallax/index.vue"; //滚动视差背景
import Heroprogress from "./childComps/Heroprogress/index.vue";
import HeroInfo from "./childComps/HeroInfo/index.vue"; //资料
import HeroSkin from "./childComps/HeroSkin/index.vue"; //皮肤鉴赏
import HeroSkill from "./childComps/HeroSkill/index.vue"; //技能页

interface Emits {
  (e: "update:modelValue", v: boolean): void;
}

const emit = defineEmits<Emits>();

const $router = useRouter();
const $heroStore = heroStore();

const scroll_index = ref(0); //滚动索引
const hero_data = $heroStore.hero_info; //英雄信息
const page_name = ["英雄资料", "皮肤鉴赏", "技能信息"];

/* 点击滚动索引 */
const toggle = (index: number) => {
  scroll_index.value = index;
};

/* 隐藏自身 */
const hide = () => {
  emit("update:modelValue", false);
  $router.replace("/hero");
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>

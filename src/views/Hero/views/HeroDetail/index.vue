<script setup lang="ts">
import { watchEffect, nextTick, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

import HeroScroll from "./components/HeroScroll/index.vue";
import HeroParallax from "./components/HeroParallax/index.vue";
import HeroProgress from "./components/HeroProgress/index.vue";
import HeroInfo from "./components/HeroInfo/index.vue";
import HeroRelationship from "./components/HeroRelationship/index.vue";
import HeroSkin from "./components/HeroSkin/index.vue";
import HeroSkill from "./components/HeroSkill/index.vue";

import { heroDefault } from "@/default";
import { HeroDetailStore, HeroStore, AudioStore } from "@/store";
import { $loading } from "@/utils";
import { MOUSE_TIP } from "@/config";
import { vMouseTip } from "@/directives";

const $router = useRouter();
const $heroDetailStore = HeroDetailStore();
const $heroStore = HeroStore();
const $audioStore = AudioStore();

/** 滚动索引标题 */
const scroll_option = ["英雄资料", "英雄关系", "技能信息", "皮肤语音"];

/** 滚动索引 */
const scroll_index = ref(1);
/** 显示左上角关闭 */
const show_close = ref(false);
/** 显示滚动索引组件 */
const show_progress = ref(false);
/** 英雄关系切换时重新加载皮肤页 */
const hero_toggle = ref(true);
/** 英雄信息 */
const hero_data = ref<Game.Hero.Detail>(heroDefault());

$audioStore.play("u4c5");

watchEffect(() => {
  hero_data.value = $heroDetailStore.hero_info;
  hero_toggle.value = false;
  nextTick(() => {
    hero_toggle.value = true;
    //切换皮肤
    $heroDetailStore.skinToggle(hero_data.value.id, "");
  });
});

//皮肤数量
const skin_num = computed(() => hero_data.value.skinCount);

/* 点击滚动索引 */
const onToggle = (index: number) => {
  scroll_index.value = index;
};

/* 滚动立即触发 */
const onScrollStart = () => {
  $audioStore.play("n4r4");
};

/* 滚动结束触发 */
const onScrollEnd = (index: number) => {
  $heroDetailStore.setPageName(scroll_option[index - 1]);
};

/* 隐藏自身 */
const handleHide = () => {
  $router.replace("/hero");
  //置空语音（盾山没有语音，可以用于置空）
  $heroDetailStore.resetStatus();

  /* 如果英雄列表职业为空，1.5秒后获取英雄列表 */
  if (!$heroStore.profession) {
    setTimeout(() => {
      $heroStore.getHeroList();
      setTimeout(() => {
        $audioStore.play("iv51");
      }, 250);
    }, 1500);
  }

  $audioStore.play("p60v");
};

//延迟显示滚动索引
setTimeout(() => {
  show_progress.value = true;
  show_close.value = true;
  hero_data.value.skins?.forEach((item) => {
    /** 海报预加载 */
    new Image().src = item.poster;
  });
}, 1500);

onMounted($loading.close);
</script>

<template>
  <div class="hero-detail">
    <!-- 顶部关闭 -->
    <div
      v-mouse-tip="{
        text: MOUSE_TIP.mk66,
      }"
      class="hero-detail__close"
      :class="{ show: show_close }"
      @click="handleHide"
    ></div>
    <HeroScroll v-model="scroll_index" @start="onScrollStart" @end="onScrollEnd">
      <!--资料皮肤-->
      <HeroParallax v-if="hero_data.posterBlur" class="scroll-item" :bg="hero_data.poster">
        <HeroInfo />
      </HeroParallax>

      <!--关系-->
      <HeroParallax class="scroll-item" :bg="hero_data.skins[skin_num].poster">
        <HeroRelationship />
      </HeroParallax>

      <!--技能-->
      <HeroParallax
        class="scroll-item"
        :bg="hero_data.skins[skin_num - 1]?.poster || hero_data.poster"
      >
        <HeroSkill v-if="hero_toggle" />
      </HeroParallax>

      <!--皮肤-->
      <HeroParallax class="scroll-item" :bg="hero_data.poster">
        <HeroSkin v-if="hero_toggle" />
      </HeroParallax>
    </HeroScroll>

    <!-- 滚动进度 -->
    <transition name="progress">
      <HeroProgress
        v-show="show_progress"
        :option="scroll_option"
        :index="scroll_index"
        @toggle="onToggle"
      />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

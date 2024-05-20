<script setup lang="ts">
import { watchEffect, nextTick, computed, watch, ref } from "vue";

import HeroScroll from "./components/HeroScroll/index.vue";
import HeroParallax from "./components/HeroParallax/index.vue";
import HeroProgress from "./components/HeroProgress/index.vue";
import HeroInfo from "./components/HeroInfo/index.vue";
import HeroRelationship from "./components/HeroRelationship/index.vue";
import HeroSkin from "./components/HeroSkin/index.vue";
import HeroSkill from "./components/HeroSkill/index.vue";
import { useHeroDetail } from "./hooks/useHeroDetail";

import { HeroDetailStore } from "@/store";
import { MOUSE_TIP } from "@/config";
import { vMouseTip } from "@/directives";
import { _isPhone } from "@/utils/tool";
import { usePlayAudio } from "@/hooks";

const $heroDetailStore = HeroDetailStore();

const { playAudio } = usePlayAudio();
const { hero_data, show, show_close, show_progress } = useHeroDetail();

/** 滚动索引标题 */
const scroll_option = ["英雄资料", "英雄关系", "技能信息", "皮肤语音"];

/** 滚动索引 */
const scroll_index = ref(1);
/** 英雄关系切换时重新加载皮肤页 */
const hero_toggle = ref(true);

//作用于切换关系的时候
watchEffect(() => {
  if (!hero_data.value) return;
  hero_data.value = $heroDetailStore.hero_info;
  hero_toggle.value = false;
  nextTick(() => {
    hero_toggle.value = true;
    //切换皮肤
    $heroDetailStore.skinToggle(hero_data.value!.id, "");
  });
});

/** 皮肤数量 */
const skin_num = computed(() => hero_data.value?.skinCount || 1);

/* 点击滚动索引 */
const onToggle = (index: number) => {
  scroll_index.value = index;
};

/* 滚动立即触发 */
const onScrollStart = () => {
  playAudio("n4r4");
};

/* 滚动结束触发 */
const onScrollEnd = (index: number) => {
  $heroDetailStore.setPageName(scroll_option[index - 1]);
};

/* 隐藏自身 */
const handleHide = () => {
  show.value = false;
  playAudio("p60v");
};

watch(show, (v) => {
  if (v) return;

  scroll_index.value = 1;
  show_close.value = false;
  hero_toggle.value = false;
  show_progress.value = false;
  $heroDetailStore.resetStatus();
});
</script>

<template>
  <teleport to="body">
    <transition :name="_isPhone ? 'fade' : 'clip'">
      <div v-if="show && hero_data" class="hero-detail">
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
          <HeroParallax
            class="scroll-item"
            :bg="hero_data.skins[skin_num]?.poster || hero_data.poster"
          >
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
    </transition>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import _cloneDeep from "lodash/cloneDeep";

import { useBarrages } from "./hooks/useBarrages";
import { vDrag } from "./directives/drag";

import { BarrageStore } from "@/store";
import { $imageView, $tip, $tool } from "@/utils";
import { vBlurLoad, vMouseTip } from "@/directives";
import { MOUSE_TIP, SCENE_TIP } from "@/config";

const $barrageStore = BarrageStore();

const barragesRef = ref<HTMLElement>();
const barrageInfoRef = ref<HTMLElement>();

const { barrage_info, init, show_card } = useBarrages();

/* 查看图片 */
const handleView = (e: Event, blur: string, big: string) => {
  $imageView({
    event: e,
    type: "DEFAULT",
    bigImage: big,
    blurImage: blur,
  });
  show_card.value = false;
};

watch(
  () => $barrageStore.barrages,
  (v) => {
    //监听弹幕数量，重新装填弹幕时会重新初始化弹幕
    if (v.length > 0) {
      nextTick(() => {
        if (!barragesRef.value || !barrageInfoRef.value) return;
        init($tool.shuffleArray(_cloneDeep(v)), barragesRef.value, barrageInfoRef.value);
      });
    }
  },
  {
    deep: true,
  },
);

setTimeout(() => {
  $barrageStore.getBarrages();
  $tip({
    align: "left-top",
    text: SCENE_TIP.kr53,
  });
}, 3000);
</script>

<template>
  <div ref="barragesRef" class="barrage-main">
    <teleport to="body">
      <transition name="fade">
        <div
          v-show="show_card"
          ref="barrageInfoRef"
          v-drag
          v-mouse-tip="{
            text: MOUSE_TIP.wj32,
          }"
          class="barrage-info"
        >
          <template v-if="barrage_info">
            <i
              v-mouse-tip="{
                text: MOUSE_TIP.sj91,
              }"
              class="iconfont wzry-guanbi"
              @click="show_card = false"
            />
            <div class="hero-info">
              <img :src="barrage_info?.avatar" alt="" class="head-img" />
              <div class="info">
                <div class="hero-name">{{ barrage_info.heroName }}</div>
                <div class="skin-name">{{ barrage_info.skinName }}</div>
              </div>
            </div>
            <div class="voice-text">——{{ barrage_info.voiceText }}</div>
            <img
              v-blurLoad="barrage_info.skinPoster"
              v-mouse-tip="{
                text: MOUSE_TIP.o12u,
              }"
              :src="barrage_info.skinBlurPoster"
              alt=""
              class="skin-poster"
              @click="handleView($event, barrage_info.skinBlurPoster, barrage_info.skinBigPoster)"
            />
          </template>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

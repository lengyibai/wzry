<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";
import _cloneDeep from "lodash/cloneDeep";

import { useBarrages } from "./hooks/useBarrages";

import { BarrageStore } from "@/store";
import { $tool } from "@/utils";
import { vBlurLoad, vDownDrag } from "@/directives";

const $barrageStore = BarrageStore();

const barragesRef = ref<HTMLElement>();
const barrageInfoRef = ref<HTMLElement>();

const { barrage_info, init, show_card } = useBarrages();

/* 查看图片 */
const handleView = (e: Event, blur: string, big: string) => {
  new $tool.ScaleFLIPImage(e, big, blur);
};

watch(
  () => $barrageStore.barrages,
  (v) => {
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

onMounted(() => {
  $barrageStore.getBarrages();
});
</script>

<template>
  <div ref="barragesRef" class="barrage-main">
    <teleport to="body">
      <transition name="fade">
        <div v-show="show_card" ref="barrageInfoRef" v-down-drag class="barrage-info">
          <template v-if="barrage_info">
            <i class="iconfont wzry-guanbi" @click="show_card = false" />
            <div class="hero-info">
              <img :src="barrage_info?.headImg" alt="" class="head-img" />
              <div class="info">
                <div class="hero-name">{{ barrage_info.heroName }}</div>
                <div class="skin-name">{{ barrage_info.skinName }}</div>
              </div>
            </div>
            <div class="voice-text">——{{ barrage_info.voiceText }}</div>
            <img
              v-blurLoad="barrage_info?.skinPoster"
              :src="barrage_info?.skinBlurPoster"
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

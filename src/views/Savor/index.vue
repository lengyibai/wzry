<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import _debounce from "lodash/debounce";
import { onActivated, onDeactivated } from "vue";

import SavorToolbar from "./components/SavorToolbar/index.vue";
import { useWaterfallResponsive } from "./hooks/useWaterfallResponsive";

import { $bus, $imageView } from "@/utils";
import { AtlasStore, AudioStore } from "@/store";
import { FilterSidebar, KBackTop, KImageLoad } from "@/components/business";
import { LibWaterfall } from "@/components/common";
import { GAME_HERO, KVP_HERO } from "@/api";

defineOptions({
  name: "Savor",
});

const $audioStore = AudioStore();
const { setScroll, loadMore, getAtlasList } = AtlasStore();
const { show_list, scroll, finish, loading } = storeToRefs(AtlasStore());

const waterfallRef = ref<InstanceType<typeof LibWaterfall>>();

const { count } = useWaterfallResponsive();

/** 当前悬浮的英雄id */
const hero_id = ref(0);
/** 是否显示返回顶部 */
const back_top = ref(false);

getAtlasList();

const debounceUpdateSizePosition = _debounce(() => {
  waterfallRef.value?.updateSizePosition();
}, 500);
const debounceWatchImgLoad = _debounce(() => {
  waterfallRef.value?.watchImgLoad();
}, 500);

/* 当前高亮的图片id */
const handleRelated = (
  e: Event,
  type: Game.Hero.AloneAtlas["type"],
  id: number,
  name: string,
  poster: string,
  blur: string,
) => {
  hero_id.value = id;
  new Image().src = blur;
  const heroAvatar = KVP_HERO.getHeroAvatarKvp()[id];

  if (!poster) return;
  if (type === "HERO") {
    const voices = GAME_HERO.getSkinVoice(id, "原皮").voice;
    $imageView({
      event: e,
      type: "HERO",
      bigImage: poster,
      blurImage: blur,
      heroName: name,
      heroAvatar,
      skinName: "原版皮肤",
      voices,
    });
  } else {
    const voices = GAME_HERO.getSkinVoice(id, name).voice;
    $imageView({
      event: e,
      type: "HERO",
      bigImage: poster,
      blurImage: blur,
      heroName: KVP_HERO.getHeroNameKvp()[id],
      heroAvatar,
      skinName: name,
      voices,
    });
  }
};

/* 加载更多 */
const onLoadMore = () => {
  loadMore();
  debounceWatchImgLoad();
};

const debounceScroll = _debounce((v: number) => {
  setScroll(v);
}, 250);
/* 滚动触发 */
const onScroll = (v: number) => {
  back_top.value = v > 250;
  debounceScroll(v);
};

/* 返回顶部 */
const onBackTop = () => {
  waterfallRef.value?.setPosition(0, true);
};

onActivated(() => {
  $audioStore.play("gz76");
  debounceUpdateSizePosition();
  waterfallRef.value?.setPosition(scroll.value);
  $bus.on("update-waterfall", debounceUpdateSizePosition);
  $bus.on("watch-waterfall", debounceWatchImgLoad);
});

onDeactivated(() => {
  $bus.off("update-waterfall");
  $bus.off("watch-waterfall");
});
</script>

<template>
  <div class="savor">
    <div class="savor-main">
      <SavorToolbar />
      <KBackTop :active="back_top" @back-top="onBackTop" />

      <LibWaterfall
        v-if="show_list.length"
        ref="waterfallRef"
        :count="count"
        :loading="loading"
        :finish="finish"
        :scroll-top="scroll"
        @load-more="onLoadMore"
        @scroll="onScroll"
      >
        <div
          v-for="item in show_list"
          :key="item.poster"
          class="atlas-card"
          :class="{
            active: hero_id === item.id,
          }"
          @mouseenter="handleRelated($event, item.type, item.id, item.name, '', item.posterBlur)"
          @mouseup="
            handleRelated($event, item.type, item.id, item.name, item.posterBig, item.posterBlur)
          "
          @touchstart="handleRelated($event, item.type, item.id, item.name, '', item.posterBlur)"
          @mouseleave="hero_id = 0"
        >
          <div v-if="item.type === 'HERO'" class="hero-name">
            {{ item.name }}
          </div>
          <div v-if="item.type === 'SKIN'" class="skin-name">
            {{ item.name }}
          </div>
          <KImageLoad
            loading-width="25%"
            :big-img="item.cover"
            class="bg"
            :blur-img="item.coverBlur"
          />
        </div>
      </LibWaterfall>
    </div>

    <!--右侧职业分类侧边栏-->
    <transition name="sidebar" appear>
      <FilterSidebar type="atlas" />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

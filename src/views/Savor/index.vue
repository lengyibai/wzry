<script setup lang="ts">
import { nextTick, ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import _debounce from "lodash/debounce";
import { onUnmounted, onActivated, onMounted, onDeactivated } from "vue";

import SavorToolbar from "./components/SavorToolbar/index.vue";
import { useWaterfallResponsive } from "./hooks/useWaterfallResponsive";

import Waterfall from "@/components/common/LibWaterfall/index.vue";
import { $bus, $tool } from "@/utils";
import { AtlasStore } from "@/store";

defineOptions({
  name: "savor",
});

const { getAtlasList, setScroll, loadMore } = AtlasStore();
const { show_list, scroll, finish } = storeToRefs(AtlasStore());

const waterfallRef = ref<InstanceType<typeof Waterfall>>();

const { count } = useWaterfallResponsive();

/** 当前悬浮的英雄id */
const hero_id = ref(0);

getAtlasList();

const debounceUpdateSizePosition = _debounce(() => {
  waterfallRef.value?.updateSizePosition();
}, 500);
const debounceWatchImgLoad = _debounce(() => {
  waterfallRef.value?.watchImgLoad();
}, 500);

/* 当前高亮的图片id */
const handleRelated = (e: Event, id: number, poster: string, blur: string) => {
  hero_id.value = id;
  new Image().src = blur;
  poster && new $tool.ScaleFLIPImage(e, poster, blur);
};

/* 加载更多 */
const onLoadMore = () => {
  loadMore();
  debounceWatchImgLoad();
};

/* 监听列表显示及上拉加载 */
watchEffect(async () => {
  if (show_list.value.length !== 0) {
    await nextTick();
    waterfallRef.value?.el && new $tool.ImageLoader(waterfallRef.value?.el);
  }
});

onActivated(() => {
  debounceUpdateSizePosition();
  waterfallRef.value?.setPosition(scroll.value);
  $bus.on("update-waterfall", debounceUpdateSizePosition);
  $bus.on("watch-waterfall", debounceWatchImgLoad);
});

onMounted(() => {
  $bus.on("update-waterfall", debounceUpdateSizePosition);
  $bus.on("watch-waterfall", debounceWatchImgLoad);
});

onDeactivated(() => {
  $bus.off("update-waterfall");
  $bus.off("watch-waterfall");
});

onUnmounted(() => {
  $bus.off("update-waterfall");
  $bus.off("watch-waterfall");
});
</script>

<template>
  <div class="savor">
    <div class="savor-main">
      <SavorToolbar />

      <Waterfall
        v-if="show_list.length"
        ref="waterfallRef"
        :count="count"
        :finish="finish"
        :scroll-top="scroll"
        @load-more="onLoadMore"
        @scroll="setScroll"
      >
        <div
          v-for="item in show_list"
          :key="item.poster"
          class="atlas-card"
          :class="{
            active: hero_id === item.id,
          }"
          @mouseenter="handleRelated($event, item.id, '', item.posterBlur)"
          @mouseup="
            handleRelated($event, item.id, item.posterBig, item.posterBlur)
          "
          @touchstart="handleRelated($event, item.id, '', item.posterBlur)"
          @touchend="
            handleRelated($event, item.id, item.posterBig, item.posterBlur)
          "
          @mouseleave="hero_id = 0"
        >
          <div v-if="item.type === 'HERO'" class="hero-name">
            {{ item.name }}
          </div>
          <div v-if="item.type === 'SKIN'" class="skin-name">
            {{ item.name }}
          </div>
          <img
            class="blur"
            :src="item.coverBlur"
            :data-src="item.cover"
            alt=""
            @dragstart.prevent
          />
        </div>
      </Waterfall>
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

<script setup lang="ts">
import { nextTick, ref } from "vue";
import { storeToRefs } from "pinia";
import _ from "lodash";

import SavorToolbar from "./components/SavorToolbar/index.vue";
import { useWaterfallResponsive } from "./hooks/useWaterfallResponsive";

import Waterfall from "@/components/common/LibWaterfall/index.vue";
import { $bus, $tool } from "@/utils";
import { AtlasStore } from "@/store";

defineOptions({
  name: "savor",
});

const { getAtlasList, setScroll, loadMore } = AtlasStore();
const { show_list, scroll } = storeToRefs(AtlasStore());

const waterfallRef = ref<InstanceType<typeof Waterfall>>();

const { count } = useWaterfallResponsive();

/** 当前悬浮的英雄id */
const hero_id = ref(0);

getAtlasList();

const debounceUpdateLoad = _.debounce(() => {
  waterfallRef.value?.updateLoad();
}, 500);
$bus.on("update-waterfall", debounceUpdateLoad);

/* 当前高亮的图片id */
const handleRelated = (e: Event, id: number, poster?: string) => {
  hero_id.value = id;

  poster && new $tool.ScaleFLIPImage(e, poster);
};

/* 加载更多 */
const onLoadMore = () => {
  loadMore();

  nextTick(() => {
    waterfallRef.value?.updateLoad();
  });
};
</script>

<template>
  <div class="savor">
    <div class="savor-main">
      <SavorToolbar />

      <div class="savor-list">
        <Waterfall
          ref="waterfallRef"
          :count="count"
          :scroll-top="scroll"
          @load-more="onLoadMore"
          @scroll="setScroll"
        >
          <div
            v-for="(item, index) in show_list"
            :key="index"
            class="atlas-card"
            :class="{
              active: hero_id === item.id,
            }"
            @mouseenter="handleRelated($event, item.id)"
            @mouseup="handleRelated($event, item.id, item.poster)"
            @touchstart="handleRelated($event, item.id)"
            @touchend="handleRelated($event, item.id)"
            @mouseleave="hero_id = 0"
          >
            <div v-if="item.type === 'HERO'" class="hero-name">
              {{ item.name }}
            </div>
            <div v-if="item.type === 'SKIN'" class="skin-name">
              {{ item.name }}
            </div>
            <img :src="item.cover" alt="" @dragstart.prevent />
          </div>
        </Waterfall>
      </div>
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

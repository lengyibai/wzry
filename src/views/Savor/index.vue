<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onActivated, onDeactivated, ref } from "vue";

import SavorToolbar from "./components/SavorToolbar/index.vue";
import { useWaterfallResponsive } from "./hooks/useWaterfallResponsive";

import { AtlasStore, KnapsackStore } from "@/store";
import { FilterSidebar, KBackTop } from "@/components/business";
import { LibWaterfall } from "@/components/common";
import { $mouseTipText, MOUSE_TIP } from "@/config";
import { vBlurLoad, vMouseTip } from "@/directives";
import { useHaveHeroSkin, usePlayAudio } from "@/hooks";
import { $imageView } from "@/utils/busTransfer";
import { $bus } from "@/utils/eventBus";
import { _debounce } from "@/utils/tool";

defineOptions({
  name: "Savor",
});

const $knapsackStore = KnapsackStore();
const $atlasStore = AtlasStore();

const { show_list, scroll, finish, loading } = storeToRefs($atlasStore);

const { playAudio } = usePlayAudio();
const { count } = useWaterfallResponsive();

const waterfallRef = ref<InstanceType<typeof LibWaterfall>>();

const savorToolbarRef = ref<InstanceType<typeof SavorToolbar>>();

/** 当前悬浮的英雄id */
const hero_id = ref(0);
/** 是否显示返回顶部 */
const back_top = ref(false);

$atlasStore.getAtlasList();

/** 悬浮卡片描述 */
const hoverDesc = computed(() => {
  return (type: "HERO" | "SKIN", id: number) => {
    if (type === "HERO" && !$knapsackStore.hero_list[id]) {
      return {
        text: $mouseTipText("a20t", { v: "英雄" }),
        disabled: true,
      };
    } else if (type === "SKIN" && !$knapsackStore.skin_list.includes(id)) {
      return {
        text: $mouseTipText("a20t", { v: "皮肤" }),
        disabled: true,
      };
    }

    return {
      text: MOUSE_TIP.o12u,
      disabled: false,
    };
  };
});

/** @description 高亮图片
 * @param id 英雄id
 * @param blur 模糊图片
 */
const handleLight = (id: number, blur: string) => {
  hero_id.value = id;
  new Image().src = blur;
};

/** @description 当前高亮的图片id
 * @param e 事件对象
 * @param type 类型
 * @param id 英雄或皮肤ID
 */
const handleRelated = (e: Event, type: Game.Hero.AloneAtlas["type"], id: number) => {
  if (type === "HERO") {
    if (!useHaveHeroSkin(id)) return;
    $imageView({
      id,
      parent: e.target as HTMLElement,
      type: "SKIN",
    });
  } else {
    if (!useHaveHeroSkin(id, "SKIN")) return;
    $imageView({
      id,
      parent: e.target as HTMLElement,
      type: "SKIN",
    });
  }
};

const debounceWatchImgLoad = _debounce(() => {
  waterfallRef.value?._watchImgLoad();
}, 500);

/** @description 加载更多 */
const onLoadMore = () => {
  $atlasStore.loadMore();
  debounceWatchImgLoad();
};

/** @description 滚动触发 */
const debounceScroll = _debounce((v: number) => {
  $atlasStore.setScroll(v);
  back_top.value = v > 250;
}, 250);

/** @description 返回顶部 */
const onBackTop = () => {
  waterfallRef.value?._setPosition(0, true);
};

/** @description 点击侧边栏触发 */
const onSidebarChange = () => {
  debounceScroll(0);
  savorToolbarRef.value?._clearName();
};

const debounceUpdateSizePosition = _debounce(() => {
  waterfallRef.value?._updateSizePosition();
}, 500);

onActivated(() => {
  playAudio("gz76");
  debounceUpdateSizePosition();
  waterfallRef.value?._setPosition(scroll.value);
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
      <transition name="to-bottom" appear>
        <SavorToolbar ref="savorToolbarRef" @change="debounceScroll(0)" />
      </transition>

      <KBackTop :active="back_top" @back-top="onBackTop" />

      <LibWaterfall
        v-if="show_list.length"
        ref="waterfallRef"
        :count="count"
        :loading="loading"
        :finish="finish"
        :scroll-top="scroll"
        @load-more="onLoadMore"
        @scroll="debounceScroll"
      >
        <div
          v-for="item in show_list"
          :key="item.poster"
          v-mouse-tip="{
            disabled: hoverDesc(item.type, item.id).disabled,
            text: hoverDesc(item.type, item.id).text,
          }"
          :class="{
            active: hero_id === item.id,
          }"
          class="atlas-card"
          @mouseenter="handleLight(item.id, item.posterBlur)"
          @mouseup="handleRelated($event, item.type, item.id)"
          @touchstart="handleLight(item.id, item.posterBlur)"
          @mouseleave="hero_id = 0"
        >
          <div v-if="item.type === 'HERO'" class="hero-name">
            {{ item.name }}
          </div>
          <div v-if="item.type === 'SKIN'" class="skin-name">
            {{ item.name }}
          </div>
          <img
            v-blur-load="{
              img: item.cover,
            }"
            class="bg"
            :src="item.coverBlur"
          />
        </div>
      </LibWaterfall>
    </div>

    <!--右侧职业分类侧边栏-->
    <FilterSidebar type="atlas" @change="onSidebarChange" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

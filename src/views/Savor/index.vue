<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onActivated, onDeactivated, onMounted, ref, watch } from "vue";

import SavorToolbar from "./components/SavorToolbar/index.vue";
import { useWaterfallResponsive } from "./hooks/useWaterfallResponsive";
import { useWaterfall } from "./hooks/useWaterfall";

import { AtlasStore, KnapsackStore } from "@/store";
import { FilterSidebar, KBackTop, KLoadMore } from "@/components/business";
import { $mouseTipText, MOUSE_TIP } from "@/config";
import { vBlurLoad, vMouseTip, vScrollVirtualization } from "@/directives";
import { useHaveHeroSkin, usePlayAudio } from "@/hooks";
import { $imageView } from "@/utils/busTransfer";
import { _LoadMore, _debounce } from "@/utils/tool";
import { useCollapse } from "@/layout/components/Sidebar/hooks/useCollapse";
import { $bus } from "@/utils/eventBus";

defineOptions({
  name: "Savor",
});

const $knapsackStore = KnapsackStore();
const $atlasStore = AtlasStore();

const { show_list, scroll, finish, loading } = storeToRefs($atlasStore);

const { playAudio } = usePlayAudio();
const { count } = useWaterfallResponsive(() => {
  debounceUpdatePosition();
});
const { updatePosition, children_position } = useWaterfall({
  count,
  gap: 15,
  num: computed(() => show_list.value.length),
});
useCollapse(() => {
  debounceUpdatePosition();
});

const waterfallBoxRef = ref<HTMLElement>();
const waterfallRef = ref<HTMLElement>();

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

/** @description 更新元素的坐标 */
const debounceUpdatePosition = _debounce(() => {
  updatePosition();

  waterfallRef.value!.style.height = "0";
  setTimeout(() => {
    waterfallRef.value!.style.height = waterfallRef.value!.scrollHeight + "px";
  }, 250);
}, 250);

/** @description 滚动触发 */
const debounceScroll = _debounce((v: number) => {
  $atlasStore.setScroll(v);
  back_top.value = v > 250;
}, 250);

/** @description 加载更多 */
const onLoadMore = () => {
  $atlasStore.loadMore();
};

/** @description 滚动指定位置 */
const setPosition = (top: number, animate = false) => {
  waterfallBoxRef.value?.scroll({ top, behavior: animate ? "smooth" : "auto" });
};

/** @description 返回顶部 */
const onBackTop = () => {
  setPosition(0, true);
};

/** @description 点击侧边栏触发 */
const onSidebarChange = () => {
  setPosition(0);
  debounceUpdatePosition();
  savorToolbarRef.value?._clearName();
};

watch(() => show_list.value.length, debounceUpdatePosition);

onMounted(() => {
  new _LoadMore(
    {
      parent: waterfallBoxRef.value!,
      loadHeight: 10,
    },
    {
      load() {
        //处于加载中或全部加载完毕禁止再次触发
        if (loading.value || finish.value) return;
        onLoadMore();
      },
      scroll: (v) => {
        debounceScroll(v);
      },
    },
  );
});

onActivated(() => {
  playAudio("gz76");
  debounceUpdatePosition();
  setPosition(scroll.value);
  $bus.on("update-waterfall", () => {
    setPosition(0);
    debounceUpdatePosition();
  });
});

onDeactivated(() => {
  $bus.off("update-waterfall");
});
</script>

<template>
  <div class="savor">
    <div class="savor-main">
      <transition name="to-bottom" appear>
        <SavorToolbar ref="savorToolbarRef" @change="debounceScroll(0)" />
      </transition>

      <KBackTop :active="back_top" @back-top="onBackTop" />

      <div ref="waterfallBoxRef" v-scroll-virtualization class="waterfall-box">
        <div ref="waterfallRef" class="waterfall">
          <template v-if="show_list.length">
            <div
              v-for="(item, index) in show_list"
              :id="'item-' + index"
              :key="item.poster"
              v-mouse-tip="{
                disabled: hoverDesc(item.type, item.id).disabled,
                text: hoverDesc(item.type, item.id).text,
              }"
              :style="{
                left: children_position[index]?.left + 'px',
                top: children_position[index]?.top + 'px',
              }"
              :class="{
                active: hero_id === item.heroId,
              }"
              class="atlas-card"
              @mouseenter="handleLight(item.heroId, item.posterBlur)"
              @mouseup="handleRelated($event, item.type, item.heroId)"
              @touchstart="handleLight(item.heroId, item.posterBlur)"
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
          </template>
        </div>

        <KLoadMore :loading="loading" class="load-more" :finish="finish" />
      </div>
    </div>

    <!--右侧职业分类侧边栏-->
    <FilterSidebar type="atlas" @change="onSidebarChange" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

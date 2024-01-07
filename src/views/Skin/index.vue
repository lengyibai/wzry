<script setup lang="ts">
import { onActivated, ref, onDeactivated } from "vue";
import _debounce from "lodash/debounce";
import { storeToRefs } from "pinia";

import SkinCard from "./childComps/SkinCard/index.vue";
import SkinToolbar from "./childComps/SkinToolbar/index.vue";

import { SkinStore, AudioStore } from "@/store";
import { $imageView, $tool } from "@/utils";
import { FilterSidebar, KBackTop } from "@/components/business";
import { LibGrid } from "@/components/common";
import { GAME_HERO, KVP_HERO } from "@/api";

defineOptions({
  name: "Skin",
});

const { setScroll, loadMore, getSkin } = SkinStore();
const { scroll, finish, show_list, loading } = storeToRefs(SkinStore());
const $audioStore = AudioStore();

//实时修改一行个数
const interval_count = [
  [2400, 5],
  [2000, 4],
  [1600, 3],
  [1400, 2],
  [720, 1],
];

const skinListRef = ref<InstanceType<typeof LibGrid>>();

/** 一行显示的数目 */
const count = ref(0);
/** 显示列表 */
const show_skin_list = ref(false);
/** 查看海报 */
const show_poster = ref(false);
/** 是否显示返回顶部 */
const back_top = ref(false);

getSkin();

/* 实时修改一行个数 */
const changeCount = () => {
  const v = document.documentElement.clientWidth;

  if (v >= 2400) {
    count.value = 6;
  }
  for (const [a, b] of interval_count) {
    if (v < a) {
      count.value = b;
    }
  }
};

/* 滚动触发 */
const debounceScroll = _debounce((v: number) => {
  setScroll(v);
  back_top.value = v > 250;
}, 250);

/* 加载更多 */
const onLoadMore = () => {
  loadMore();
};

/* 点击工具栏中的选项 */
const onShowTool = (e: Event, v: { type: string; data: Game.Hero.Skin }) => {
  if (v.type === "poster") {
    show_poster.value = true;
    const { posterBig, posterBlur, name, heroName, hero } = v.data;
    const voices = GAME_HERO.getSkinVoice(hero, name).voice;
    $imageView({
      event: e,
      type: "HERO",
      bigImage: posterBig,
      blurImage: posterBlur,
      heroName,
      heroAvatar: KVP_HERO.getHeroAvatarKvp()[hero],
      skinName: name,
      voices,
    });
  }
  $audioStore.play("u4c5");
};

/* 悬浮卡片 */
const handleEnterCard = () => {
  $audioStore.play("n4r4");
};

/* 返回顶部 */
const onBackTop = () => {
  skinListRef.value?.setPosition(0, true);
};

onActivated(() => {
  $audioStore.play("gz43");
  skinListRef.value?.setPosition(scroll.value);
});

onActivated(async () => {
  changeCount();
  window.addEventListener("resize", changeCount);

  //显示英雄列表
  await $tool.promiseTimeout(() => {
    show_skin_list.value = true;
  }, 250);
});

onDeactivated(() => {
  window.removeEventListener("resize", changeCount);
});
</script>

<template>
  <div class="skin">
    <div class="skin-main">
      <transition name="fade" appear>
        <SkinToolbar @search="debounceScroll(0)" />
      </transition>

      <KBackTop :active="back_top" @back-top="onBackTop" />

      <transition name="card-list">
        <LibGrid
          v-if="show_list.length && show_skin_list"
          ref="skinListRef"
          :finish="finish"
          scroll-id="skin_list"
          gap="1.5625rem"
          :loading="loading"
          :count="count"
          :scroll-top="scroll"
          @load-more="onLoadMore"
          @scroll="debounceScroll"
        >
          <transition-group name="skin-card" appear>
            <div
              v-for="(item, index) in show_list"
              :key="item.id"
              class="skin-card"
              :style="{
                'transition-delay': (index % (count * 2)) * 0.1 + 's',
              }"
              @mouseenter="handleEnterCard"
              @touchstart="handleEnterCard"
            >
              <SkinCard :data="item" @showTool="onShowTool" />
            </div>
          </transition-group>
        </LibGrid>
      </transition>
    </div>

    <!--右侧职业分类侧边栏-->
    <transition name="sidebar" appear>
      <FilterSidebar type="skin" @change="debounceScroll(0)" />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

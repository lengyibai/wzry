<script setup lang="ts">
import _debounce from "lodash/debounce";
import { onDeactivated, onActivated, ref } from "vue";
import { storeToRefs } from "pinia";

import HeroCard from "./components/HeroCard/index.vue";
import HeroToolbar from "./components/HeroToolbar/index.vue";

import { AudioStore, HeroStore } from "@/store";
import { FilterSidebar, KBackTop, KEmpty } from "@/components/business";
import { LibGrid } from "@/components/common";
import { usePagingLoad } from "@/hooks";
import { $heroDetail } from "@/utils/busTransfer";
import { _promiseTimeout } from "@/utils/tool";

defineOptions({
  name: "Hero",
});

const $audioStore = AudioStore();
const $heroStore = HeroStore();

const { scroll, show_list, finish, loading } = storeToRefs($heroStore);

const { page_count } = usePagingLoad();

/** 一行个数区间 */
const interval_count = [
  [2200, 8],
  [1800, 7],
  [1600, 6],
  [1400, 5],
  [1024, 4],
  [720, 3],
  [480, 2],
];

const heroToolbarRef = ref<InstanceType<typeof HeroToolbar>>();
const heroListRef = ref<InstanceType<typeof LibGrid>>();

/** 一行显示的数目 */
const count = ref(0);
/** 显示列表 */
const show_hero_list = ref(false);
/** 是否显示返回顶部 */
const back_top = ref(false);

$heroStore.getHeroList();

/* 实时修改一行个数 */
const changeCount = () => {
  const v = window.innerWidth;

  if (v >= 2200) {
    count.value = 9;
  }

  for (const [a, b] of interval_count) {
    if (v < a) {
      count.value = b;
    }
  }
};

/* 悬浮卡片 */
const debounceEnterCard = _debounce(() => {
  $audioStore.play("n4r4");
}, 100);

/* 滚动触发 */
const debounceScroll = _debounce((v: number) => {
  $heroStore.setScroll(v);
  back_top.value = v > 250;
}, 250);

/* 查看详情 */
const onViewDetail = (id: number) => {
  $heroDetail(id);
};

/* 返回顶部 */
const onBackTop = () => {
  heroListRef.value?._setPosition(0, true);
};

/* 点击侧边栏触发 */
const onSidebarChange = () => {
  debounceScroll(0);
  heroToolbarRef.value?._clearName();
};

onActivated(async () => {
  changeCount();
  window.addEventListener("resize", changeCount);

  $audioStore.play("iv51");
  heroListRef.value?._setPosition(scroll.value);

  //显示英雄列表
  await _promiseTimeout(() => {
    show_hero_list.value = true;
  }, 250);
});

onDeactivated(() => {
  window.removeEventListener("resize", changeCount);
});
</script>

<template>
  <div class="hero">
    <div class="hero__main">
      <transition name="fade" appear>
        <HeroToolbar ref="heroToolbarRef" @change="debounceScroll(0)" />
      </transition>

      <KBackTop :active="back_top" @back-top="onBackTop" />

      <!-- 列表 -->
      <LibGrid
        v-if="show_list.length && show_hero_list"
        ref="heroListRef"
        :finish="finish"
        :loading="loading"
        gap="1.5625rem"
        :count="count"
        @scroll="debounceScroll"
        @load-more="$heroStore.loadMore"
      >
        <transition-group name="card" appear>
          <div
            v-for="(item, index) in show_list"
            :key="index"
            class="hero-card"
            :style="{
              'transition-delay': (index % page_count) * 0.025 + 's',
            }"
            @mouseenter="debounceEnterCard"
            @touchstart="debounceEnterCard"
          >
            <HeroCard :data="item" @view="onViewDetail" />
          </div>
        </transition-group>
      </LibGrid>

      <KEmpty v-if="show_list.length === 0" tip="你还没有拥有英雄" />
    </div>

    <!--右侧英雄职业分类侧边栏-->
    <FilterSidebar type="hero" @change="onSidebarChange" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

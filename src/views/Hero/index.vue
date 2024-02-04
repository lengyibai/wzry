<script setup lang="ts">
import _debounce from "lodash/debounce";
import { onDeactivated, onActivated, ref, watch, defineAsyncComponent } from "vue";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

import HeroCard from "./components/HeroCard/index.vue";
import HeroToolbar from "./components/HeroToolbar/index.vue";

import { heroDefault } from "@/default";
import { AudioStore, HeroStore, HeroDetailStore } from "@/store";
import { $tool, $loading } from "@/utils";
import { FilterSidebar, KBackTop } from "@/components/business";
import { LibGrid } from "@/components/common";
import { usePagingLoad } from "@/hooks";
import { GAME_HERO } from "@/api";

defineOptions({
  name: "Hero",
});

const HeroDetail = defineAsyncComponent(() => import("./views/HeroDetail/index.vue"));

const $route = useRoute();
const $router = useRouter();
const $audioStore = AudioStore();
const $heroDetail = HeroDetailStore();
const $heroStore = HeroStore();

const { all_data, scroll, show_list, finish, loading } = storeToRefs($heroStore);

const { page_count } = usePagingLoad();

/** 地址栏参数 */
const id: unknown = $route.query.id;

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
/** 显示英雄详情 */
const show_HeroDetail = ref(false);
/** 显示列表 */
const show_hero_list = ref(false);
/** 是否显示返回顶部 */
const back_top = ref(false);
/** 英雄信息 */
const hero_info = ref<Game.Hero.Detail>(heroDefault());

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

/* 查看详情 */
const onViewClick = (id: number) => {
  //获取指定英雄数据
  const hero = GAME_HERO.getHeroDetail(id);
  $loading.show(`正在加载${hero.name}详情页`);
  hero_info.value = hero;
  $heroDetail.setHeroInfo(hero_info.value);

  //设置路由参数只用于记录，方便刷新时直接打开详情
  $router.push({
    path: "/hero",
    query: {
      id: hero_info.value.id,
    },
  });
};

//如果地址栏存在id，则打开查看详情
if (all_data.value.length === 0) {
  if (id) {
    onViewClick(Number(id));
  } else {
    $heroStore.getHeroList();
  }
}

/* 滚动触发 */
const debounceScroll = _debounce((v: number) => {
  $heroStore.setScroll(v);
  back_top.value = v > 250;
}, 250);

/* 返回顶部 */
const onBackTop = () => {
  heroListRef.value?._setPosition(0, true);
};

/* 点击侧边栏触发 */
const onSidebarChange = () => {
  debounceScroll(0);
  heroToolbarRef.value?._clearName();
};

watch(
  () => $route.query,
  (v) => {
    if (v.id) {
      //延迟0.1秒显示解决移动端动画掉帧
      setTimeout(() => {
        show_HeroDetail.value = true;
      }, 100);
    } else {
      show_HeroDetail.value = false;
    }
  },
  {
    immediate: true,
  },
);

onActivated(async () => {
  changeCount();
  window.addEventListener("resize", changeCount);

  $audioStore.play("iv51");
  heroListRef.value?._setPosition(scroll.value);

  //显示英雄列表
  await $tool.promiseTimeout(() => {
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
        scroll-id="hero_list"
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
            @@touchstart="debounceEnterCard"
          >
            <HeroCard :data="item" @view="onViewClick(item.id!)" />
          </div>
        </transition-group>
      </LibGrid>
    </div>

    <!--右侧英雄职业分类侧边栏-->
    <FilterSidebar type="hero" @change="onSidebarChange" />

    <!--英雄详情页-->
    <teleport to="body">
      <transition :name="$tool.isPhone ? 'fade' : 'clip'">
        <HeroDetail v-if="show_HeroDetail" />
      </transition>
    </teleport>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

<script setup lang="ts">
import _debounce from "lodash/debounce";
import { onDeactivated, onActivated, ref, watch, defineAsyncComponent } from "vue";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

import HeroCard from "./childComps/HeroCard/index.vue";
import HeroToolbar from "./childComps/HeroToolbar/index.vue";

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

const HeroDetail = defineAsyncComponent(() => import("./childViews/HeroDetail/index.vue"));

const $route = useRoute();
const $router = useRouter();
const $audioStore = AudioStore();
const $heroDetail = HeroDetailStore();
const { getHeroList, setScroll, loadMore } = HeroStore();
const { all_data, scroll, show_list, finish, loading } = storeToRefs(HeroStore());

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

const heroListRef = ref<InstanceType<typeof LibGrid>>();

/** 一行显示的数目 */
const count = ref(0);
/** 显示英雄详情 */
const show_HeroDetail = ref(false);
/** 显示列表 */
const show_herolist = ref(false);
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
const handleEnterCard = (data: Game.Hero.Data) => {
  $audioStore.play("n4r4");
  //图片预加载
  new Image().src = data.avatar;
};

/* 查看详情 */
const onViewClick = (id: number) => {
  //获取指定英雄数据
  const hero = GAME_HERO.getHeroDetail(id);
  $loading.show(`${hero.name}`);
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
    getHeroList();
  }
}

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
  heroListRef.value?.setPosition(0, true);
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
  heroListRef.value?.setPosition(scroll.value);

  //显示英雄列表
  await $tool.promiseTimeout(() => {
    show_herolist.value = true;
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
        <HeroToolbar />
      </transition>

      <KBackTop :active="back_top" @back-top="onBackTop" />

      <!-- 列表 -->
      <LibGrid
        v-if="show_list.length && show_herolist"
        ref="heroListRef"
        :finish="finish"
        :loading="loading"
        scroll-id="hero_list"
        gap="1.5625rem"
        :count="count"
        @scroll="onScroll"
        @load-more="loadMore"
      >
        <transition-group name="card" appear>
          <div
            v-for="(item, index) in show_list"
            :key="index"
            class="hero-card"
            :style="{
              'transition-delay': (index % page_count) * 0.025 + 's',
            }"
            @mouseenter="handleEnterCard(item)"
          >
            <HeroCard :data="item" @view="onViewClick(item.id!)" />
          </div>
        </transition-group>
      </LibGrid>
    </div>

    <!--右侧英雄职业分类侧边栏-->
    <transition name="sidebar" appear>
      <FilterSidebar type="hero" />
    </transition>

    <!--英雄详情页-->
    <teleport to="body">
      <transition name="clip">
        <HeroDetail v-if="show_HeroDetail" />
      </transition>
    </teleport>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

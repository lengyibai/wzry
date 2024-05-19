<script setup lang="ts">
import _debounce from "lodash/debounce";
import { onDeactivated, onActivated, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

import HeroCard from "./components/HeroCard/index.vue";
import HeroToolbar from "./components/HeroToolbar/index.vue";

import { AudioStore, HeroDebrisStore, KnapsackStore } from "@/store";
import { FilterSidebar, KBackTop, KEmpty } from "@/components/business";
import { LibGrid } from "@/components/common";
import { usePagingLoad } from "@/hooks";
import { $confirmText, GAME_PROP, ROUTE_PATH } from "@/config";
import { $confirm } from "@/utils/busTransfer";
import { _promiseTimeout } from "@/utils/tool";

defineOptions({
  name: "HeroDebrisShop",
});

const $route = useRoute();
const $router = useRouter();

const $audioStore = AudioStore();
const $knapsackStore = KnapsackStore();
const $heroDebrisStore = HeroDebrisStore();

const { scroll, show_list, finish, loading } = storeToRefs($heroDebrisStore);

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
/** 显示英雄详情 */
const show_HeroDetail = ref(false);
/** 显示列表 */
const show_hero_list = ref(false);
/** 是否显示返回顶部 */
const back_top = ref(false);

$heroDebrisStore.getHeroList();

/** @description 实时修改一行个数 */
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

/** @description 悬浮卡片 */
const debounceEnterCard = _debounce(() => {
  $audioStore.play("n4r4");
}, 100);

/** @description 滚动触发 */
const debounceScroll = _debounce((v: number) => {
  $heroDebrisStore.setScroll(v);
  back_top.value = v > 250;
}, 250);

/** @description 返回顶部 */
const onBackTop = () => {
  heroListRef.value?._setPosition(0, true);
};

/** @description 点击侧边栏触发 */
const onSidebarChange = () => {
  debounceScroll(0);
  heroToolbarRef.value?._clearName();
};

/** @description 兑换 */
const onExchange = (data: Game.Hero.Data) => {
  if ($knapsackStore.articles.HERO_DEBRIS >= Number(data.price)) {
    $confirm({
      text: $confirmText("r36m", {
        name: data.name,
        prop: GAME_PROP.NAME["HERO_DEBRIS"],
        count: data.price,
      }),
      confirm() {
        $knapsackStore.setGamePropNum("HERO_DEBRIS", Number(data.price), "SUB").then(() => {
          $knapsackStore.addHero(data.id);
        });
      },
    });
  } else {
    $confirm({
      text: $confirmText("p89n", { prop: GAME_PROP.NAME["HERO_DEBRIS"] }),
      confirm() {
        $router.push(ROUTE_PATH.PROP_SHOP);
      },
    });
  }
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

  $audioStore.play("h3w0");
  heroListRef.value?._setPosition(scroll.value);

  //显示英雄列表
  await _promiseTimeout(250);
  show_hero_list.value = true;
});

onDeactivated(() => {
  window.removeEventListener("resize", changeCount);
});
</script>

<template>
  <div class="hero">
    <div class="hero__main">
      <transition name="to-bottom" appear>
        <HeroToolbar ref="heroToolbarRef" @change="debounceScroll(0)" />
      </transition>

      <KBackTop :active="back_top" @back-top="onBackTop" />
      <!-- 列表 -->
      <LibGrid
        v-if="show_list.length && show_hero_list"
        ref="heroListRef"
        :finish="finish"
        :loading="loading"
        gap="1rem"
        :count="count"
        @scroll="debounceScroll"
        @load-more="$heroDebrisStore.loadMore"
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
            <HeroCard :data="item" @exchange="onExchange" />
          </div>
        </transition-group>
      </LibGrid>

      <KEmpty v-if="show_list.length === 0" tip="暂无可兑换英雄" />
    </div>

    <!--右侧英雄职业分类侧边栏-->
    <FilterSidebar type="heroDebris" @change="onSidebarChange" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
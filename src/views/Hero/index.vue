<script setup lang="ts">
import _debounce from "lodash/debounce";
import {
  onUnmounted,
  onActivated,
  onMounted,
  ref,
  watch,
  defineAsyncComponent,
  nextTick,
  watchEffect,
} from "vue";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

import HeroCard from "./childComps/HeroCard/index.vue";
import HeroToolbar from "./childComps/HeroToolbar/index.vue";

import { heroDefault } from "@/default";
import { AudioStore, HeroStore, HeroDetailStore } from "@/store";
import { API_HERO } from "@/api";
import { $tool, $bus } from "@/utils";
import LibGrid from "@/components/common/LibGrid/index.vue";

defineOptions({
  name: "Hero",
});

const HeroDetail = defineAsyncComponent(() => import("./childViews/HeroDetail/index.vue"));

const $route = useRoute();
const $router = useRouter();
const $audioStore = AudioStore();
const $heroDetail = HeroDetailStore();
const { getHeroList, setScroll, loadMore } = HeroStore();
const { all_data, scroll, show_list, finish } = storeToRefs(HeroStore());

/** 地址栏参数 */
const id: unknown = $route.query.id;

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
const hero_info = ref<Hero.Data>(heroDefault());

/* 悬浮卡片 */
const handleEnterCard = (data: Hero.Data) => {
  $audioStore.play("n4r4");
  //图片预加载
  new Image().src = data.headImg;
};

/* 查看详情 */
const onViewClick = (id: number) => {
  //获取指定英雄数据
  API_HERO.getHeroDetail(id).then((hero) => {
    hero_info.value = hero;
    $heroDetail.setHeroInfo(hero_info.value);

    //设置路由参数只用于记录，方便刷新时直接打开详情
    $router.push({
      path: "/hero",
      query: {
        id: hero_info.value.id,
      },
    });
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

/* 加载更多 */
const onLoadMore = () => {
  loadMore();
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

/* 监听列表显示及上拉加载 */
watchEffect(async () => {
  if (show_list.value.length !== 0 && show_herolist.value) {
    await nextTick();
    heroListRef.value?.el && new $tool.ImageLoader(heroListRef.value?.el);
  }
});

onActivated(() => {
  $audioStore.play("4d8m");
  heroListRef.value?.setPosition(scroll.value);
});

onMounted(async () => {
  const change = [
    [2200, 8],
    [1800, 7],
    [1600, 6],
    [1400, 5],
    [1024, 4],
    [720, 3],
    [480, 2],
  ];

  //实时修改一行个数
  const changeCount = () => {
    const v = window.innerWidth;

    if (v >= 2200) {
      count.value = 9;
    }
    for (const [a, b] of change) {
      if (v < a) {
        count.value = b;
      }
    }
  };
  changeCount();

  $bus.on("resize", () => {
    changeCount();
  });

  //显示英雄列表
  await $tool.promiseTimeout(() => {
    show_herolist.value = true;
  }, 250);
});

onUnmounted(() => {
  $bus.off("resize");
});
</script>

<template>
  <div class="hero">
    <div class="hero__main">
      <transition name="fade" appear>
        <HeroToolbar />
      </transition>

      <K-BackTop :active="back_top" @back-top="onBackTop" />

      <!-- 列表 -->
      <LibGrid
        v-if="show_list.length && show_herolist"
        ref="heroListRef"
        :finish="finish"
        scroll-id="hero_list"
        gap="1.5625rem"
        :count="count"
        @scroll="onScroll"
        @load-more="onLoadMore"
      >
        <transition-group name="card" appear>
          <div
            v-for="(item, index) in show_list"
            :key="index"
            class="hero-card"
            :style="{
              'transition-delay': (index % 30) * 0.025 + 's',
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
    <transition name="clip">
      <HeroDetail
        v-if="show_HeroDetail"
        :data="hero_info"
        :voices="hero_info.voices"
        :skins="hero_info.skins"
        :skills="hero_info.skills"
      />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

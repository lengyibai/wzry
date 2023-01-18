<script setup lang="ts">
import {
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  defineAsyncComponent,
} from "vue";
import { useRoute, useRouter } from "vue-router";

import HeroToolbar from "./childComps/HeroToolbar/index.vue";
import HeroCard from "./childComps/HeroCard/index.vue"; //英雄卡片
import HeroSidebar from "./childComps/HeroSidebar/index.vue"; //侧边栏

import { $debounceInstant } from "@/utils";
import { $deepCopy, $lazyLoadImages } from "@/utils";
import { getHeroDetail } from "@/api/main/games/hero";
import { heroDefault } from "@/defaultValue";
import $bus from "@/utils/eventBus";
import heroDetail from "@/store/heroDetail";
import heroStore from "@/store/hero";
import otherStore from "@/store/other";
import switchStore from "@/store/switch";

const HeroDetail = defineAsyncComponent(
  () => import("./childViews/HeroDetail/index.vue")
); //详情页

const $route = useRoute();
const $router = useRouter();
const $otherStore = otherStore();
const $heroStore = heroStore();
const $heroDetail = heroDetail();

const $switchStore = switchStore();

let page = 1; //当前页数
let page_total = 0; //总页数
let page_count = 20; //一页显示的个数
let id: unknown = $route.query.id; //地址栏参数
let cache_list: Hero.Data[] = []; //总数据

const heroListRef = ref(); //布局容器
const count = ref(0); //一行显示的数目
const show = ref(false); //是否显示列表
const show_HeroDetail = ref(false); //显示英雄详情
const hero_list = ref<Hero.Data[]>([]); //英雄列表
const hero_info = ref<Hero.Data>($deepCopy(heroDefault)); //英雄信息

$switchStore.$clickAudio("4d8m");

/* 设置图片懒加载 */
const setLazyImg = () => {
  const imgs = heroListRef.value.childrens.map((item: HTMLElement) => {
    return item.children[0].children[1];
  });
  $lazyLoadImages(imgs);
};

/* 悬浮卡片 */
const handleEnterCard = () => {
  $debounceInstant(() => {
    $switchStore.$clickAudio("n4r4");
  }, 50);
};

/* 查看详情 */
const EmitViewClick = (id: number) => {
  /* 获取指定英雄数据 */
  getHeroDetail(id).then((hero) => {
    /* 获取指定英雄皮肤 */
    hero_info.value = hero;
    $heroDetail.setHeroInfo(hero_info.value);
    show_HeroDetail.value = true;

    /* 设置路由参数只用于记录，方便刷新时直接打开详情 */
    $router.push({
      path: "/hero",
      query: {
        id: hero_info.value.id,
      },
    });
  });
};
//如果地址栏存在id，则打开查看详情
if (id) {
  EmitViewClick(Number(id));
} else {
  $heroStore.getHeroList($heroDetail.hero_info.profession[0]);
}

/* 加载更多 */
const EmitLoadMore = () => {
  if (page_total > page) {
    page += 1;

    hero_list.value.push(
      ...cache_list.slice(page * page_count, (page + 1) * page_count)
    );
  }
  nextTick(() => {
    heroListRef.value.updateHeight();
    setLazyImg();
  });
};

/* 折叠展开侧边栏时触发 */
$otherStore.setTriggerFn(() => {
  heroListRef.value.updateHeight();
});

/* 监听筛选后的英雄列表 */
watch(
  () => $heroStore.filter_list,
  (v) => {
    show.value = false;
    page = 0;
    hero_list.value = [];
    cache_list = v;
    hero_list.value = cache_list.slice(
      page * page_count,
      (page + 1) * page_count
    );
    page_total = Math.round(cache_list.length / page_count);

    nextTick(() => {
      show.value = true;
    });
  },
  { deep: true, immediate: true }
);

onMounted(() => {
  /* 实时修改一行个数 */
  const change = [
    [1450, 5],
    [1300, 4],
    [1130, 3],
    [960, 2],
    [800, 1],
  ];
  const changeCount = () => {
    const v = document.documentElement.clientWidth;
    if (v > 1400) {
      count.value = 6;
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
});

onBeforeUnmount(() => {
  $bus.off("resize");
});
</script>

<template>
  <div class="hero">
    <transition name="card-list">
      <div class="hero-main">
        <HeroToolbar />
        <LibGridLayout
          v-if="hero_list.length && show"
          ref="heroListRef"
          class="hero-list"
          scroll-id="hero_list"
          gap="25px"
          :count="count"
          :eqh-multiple="1.5"
          @load-more="EmitLoadMore"
        >
          <transition-group name="card" appear>
            <div
              v-for="(item, index) in hero_list"
              :key="item.id"
              :style="{
                'transition-delay': 0.025 * index + 's',
              }"
              @mouseenter="handleEnterCard"
            >
              <HeroCard :data="item" @view="EmitViewClick(item.id!)" />
            </div>
          </transition-group>
        </LibGridLayout>
      </div>
    </transition>

    <!--右侧英雄职业分类侧边栏-->
    <transition name="sidebar" appear>
      <HeroSidebar />
    </transition>

    <!--英雄详情页-->
    <transition name="clip">
      <HeroDetail
        v-if="show_HeroDetail"
        v-model="show_HeroDetail"
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

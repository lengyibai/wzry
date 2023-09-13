<script setup lang="ts">
import { nextTick, onBeforeUnmount, onActivated, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import HeroToolbar from "./childComps/HeroToolbar/index.vue";
import HeroCard from "./childComps/HeroCard/index.vue";
import HeroDetail from "./childViews/HeroDetail/index.vue";

import { heroDefault } from "@/default";
import { API_HERO } from "@/api";
import { AudioStore, HeroStore, HeroDetailStore } from "@/store";
import { $tool, $bus } from "@/utils";

defineOptions({
  name: "hero",
});

const $route = useRoute();
const $router = useRouter();
const $audioStore = AudioStore();
const $heroStore = HeroStore();
const $heroDetail = HeroDetailStore();

/** 地址栏参数 */
let id: unknown = $route.query.id;

/** 一行显示的数目 */
const count = ref(0);
/** 显示英雄详情 */
const show_HeroDetail = ref(false);
/** 显示列表 */
const show_list = ref(false);
/** 显示工具栏 */
const show_tool = ref(false);
/** 切换显示列表 */
const toggle_show = ref(false);
/** 英雄信息 */
const hero_info = ref<Hero.Data>($tool.deepCopy(heroDefault));

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
if ($heroStore.hero_list.length === 0) {
  if (id) {
    onViewClick(Number(id));
  } else {
    $heroStore.getHeroList();
  }
}

/* 滚动触发 */
const onScroll = (v: number) => {
  $tool.debounce(() => {
    $heroStore.setScroll(v);
  }, 250);
};

/* 加载更多 */
const onLoadMore = () => {
  $heroStore.loadMore();
};

/* 监听筛选后的英雄列表用于切换显示 */
watch(
  () => $heroStore.filter_list,
  () => {
    toggle_show.value = false;

    nextTick(() => {
      toggle_show.value = true;
    });
  },
  { deep: true, immediate: true },
);

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

onActivated(() => {
  $audioStore.play("4d8m");
});

onMounted(async () => {
  const change = [
    [2000, 8],
    [1800, 7],
    [1600, 6],
    [1400, 5],
    [1024, 4],
    [720, 3],
    [480, 2],
  ];

  //实时修改一行个数
  const changeCount = () => {
    const v = document.documentElement.clientWidth;
    if (v > 2200) {
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

  //显示工具栏
  await $tool.promiseTimeout(() => {
    show_tool.value = true;
  }, 500);
  //显示英雄列表
  await $tool.promiseTimeout(() => {
    show_list.value = true;
  }, 250);
});

onBeforeUnmount(() => {
  $bus.off("resize");
});
</script>

<template>
  <div class="hero">
    <transition name="card-list">
      <div class="hero-main">
        <!-- 工具栏 -->
        <transition name="fade" appear>
          <HeroToolbar v-show="show_tool" />
        </transition>

        <!-- 列表 -->
        <LibGrid
          v-show="show_list"
          v-if="$heroStore.show_list.length && toggle_show && show_list"
          class="hero-list"
          scroll-id="hero_list"
          gap="1.5625rem"
          :count="count"
          :scroll-top="$heroStore.scroll"
          @scroll="onScroll"
          @load-more="onLoadMore"
        >
          <transition-group name="card" appear>
            <div
              v-for="(item, index) in $heroStore.show_list"
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
    </transition>

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

<script setup lang="ts" name="hero">
import { nextTick, onBeforeUnmount, onActivated, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import HeroToolbar from "./childComps/HeroToolbar/index.vue"; //工具栏
import HeroCard from "./childComps/HeroCard/index.vue"; //英雄卡片
import HeroDetail from "./childViews/HeroDetail/index.vue"; //英雄详情

import { $debounce, $deepCopy, $promiseTimeout } from "@/utils";
import { getHeroDetail } from "@/api/main/games/hero";
import { heroDefault } from "@/default";
import $bus from "@/utils/eventBus";
import heroDetail from "@/store/heroDetail";
import heroStore from "@/store/hero";
import collapseStore from "@/store/collapse";
import switchStore from "@/store/switch";

const $route = useRoute();
const $router = useRouter();
const $collapseStore = collapseStore();
const $switchStore = switchStore();
const $heroStore = heroStore();
const $heroDetail = heroDetail();

let id: unknown = $route.query.id; //地址栏参数

const heroListRef = ref(); //布局容器

const count = ref(0); //一行显示的数目
const show_HeroDetail = ref(false); //显示英雄详情
const show_list = ref(false); //显示列表
const show_tool = ref(false); //显示工具栏
const toggle_show = ref(false); //切换显示列表
const hero_info = ref<Hero.Data>($deepCopy(heroDefault)); //英雄信息

/* 悬浮卡片 */
const handleEnterCard = (data: Hero.Data) => {
  $switchStore.$clickAudio("n4r4");
  new Image().src = data.headImg; //图片预加载
};

/* 查看详情 */
const EmitViewClick = (id: number) => {
  //获取指定英雄数据
  getHeroDetail(id).then((hero) => {
    //获取指定英雄皮肤
    hero_info.value = hero;
    $heroDetail.setHeroInfo(hero_info.value);

    //延迟0.1秒显示解决移动端动画掉帧
    setTimeout(() => {
      show_HeroDetail.value = true;
    }, 100);

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
    EmitViewClick(Number(id));
  } else {
    $heroStore.getHeroList().then(() => {
      setTimeout(() => {
        $switchStore.$clickAudio("4d8m");
      }, 750);
    });
  }
}

/* 滚动触发 */
const EmitScroll = (v: number) => {
  $debounce(() => {
    $heroStore.setScroll(v);
  }, 250);
};

/* 加载更多 */
const EmitLoadMore = () => {
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
  { deep: true, immediate: true }
);

onMounted(async () => {
  const change = [
    [1450, 5],
    [1300, 4],
    [1130, 3],
    [960, 2],
    [800, 1],
  ];

  //实时修改一行个数
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

  $switchStore.$loading.close();

  //显示工具栏
  await $promiseTimeout(() => {
    show_tool.value = true;
  }, 500);
  // 显示英雄列表
  await $promiseTimeout(() => {
    show_list.value = true;
  }, 250);
});

onActivated(() => {
  $switchStore.$loading.close();
});

onBeforeUnmount(() => {
  $bus.off("resize");
  $collapseStore.clearTrigger();
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
        <LibGridLayout
          v-show="show_list"
          v-if="$heroStore.show_list.length && toggle_show && show_list"
          ref="heroListRef"
          class="hero-list"
          scroll-id="hero_list"
          gap="25px"
          :count="count"
          :scroll-top="$heroStore.scroll"
          @scroll="EmitScroll"
          @load-more="EmitLoadMore"
        >
          <transition-group name="card" appear>
            <div
              v-for="(item, index) in $heroStore.show_list"
              :key="index"
              class="hero-card"
              :style="{
                'transition-delay': (index % 20) * 0.025 + 's',
              }"
              @mouseenter="handleEnterCard(item)"
            >
              <HeroCard :data="item" @view="EmitViewClick(item.id!)" />
            </div>
          </transition-group>
        </LibGridLayout>
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

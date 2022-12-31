<script setup lang="ts">
import {
  nextTick,
  onBeforeUnmount,
  onMounted,
  onActivated,
  ref,
  watch,
  defineAsyncComponent,
} from "vue";
import { useRoute } from "vue-router";
import $bus from "@/utils/eventBus";
import heroStore from "@/store/hero";
import useIntegrationData from "./hooks/useIntegrationData";
import HeroToolbar from "./childComps/HeroToolbar/index.vue";
import HeroCard from "./childComps/HeroCard/index.vue"; //英雄卡片
import HeroSidebar from "./childComps/HeroSidebar/index.vue"; //侧边栏
const HeroDetail = defineAsyncComponent(
  () => import("./childViews/HeroDetail/index.vue")
); //详情页

const $route = useRoute();
const $heroStore = heroStore();

const heroListRef = ref();
const id: unknown = $route.query.id; //地址栏参数
const count = ref(0); //一行显示的数目
const show = ref(false); //是否显示列表
const hero_list = ref<Hero.Data[]>([]); //英雄列表
const cache_list = ref<Hero.Data[]>([]); //总数据
const page = ref(1); //当前页数
const page_count = ref(20); //一页显示的个数
const page_total = ref(0); //总页数

const { hero_info, show_HeroDetail, EmitViewClick } = useIntegrationData(id);

/* 监听筛选后的英雄列表 */
watch(
  () => $heroStore.filter_list,
  (v) => {
    show.value = false;
    page.value = 0;
    hero_list.value = [];
    cache_list.value = v;
    hero_list.value = cache_list.value.slice(
      page.value * page_count.value,
      (page.value + 1) * page_count.value
    );
    page_total.value = Math.round(cache_list.value.length / page_count.value);

    nextTick(() => {
      show.value = true;
    });
  },
  { deep: true, immediate: true }
);

/* 加载更多 */
const EmitLoadMore = () => {
  if (page_total.value > page.value) {
    page.value += 1;

    hero_list.value.push(
      ...cache_list.value.slice(
        page.value * page_count.value,
        (page.value + 1) * page_count.value
      )
    );
    heroListRef.value.updateHeight();
  }
};

/* 进入页面后更新高度 */
onActivated(() => {
  nextTick(() => {
    heroListRef.value.updateHeight();
  }).catch(() => {});
});

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
          class="hero-list"
          ref="heroListRef"
          gap="25px"
          v-if="hero_list.length && show"
          :count="count"
          :eqhMultiple="1.5"
          @load-more="EmitLoadMore"
        >
          <transition-group name="card" appear>
            <div
              v-for="(item, index) in hero_list"
              :style="{
                'transition-delay': 0.025 * index + 's',
              }"
              :key="item.id"
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

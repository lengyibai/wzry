<template>
  <div class="hero">
    <transition name="card-list">
      <div class="hero-main" v-if="show">
        <LibGridLayout ref="heroListRef" gap="25px" v-if="hero_list.length" :count="count" :eqhMultiple="1.5">
          <transition-group name="card" appear>
            <div
              v-for="(item, index) in hero_list"
              :style="{
                'transition-delay': 0.025 * index + 's',
              }"
              :key="item.id"
            >
              <HeroCard :data="item" @view="viewClick(item.id!)" />
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

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, onActivated, ref, watch, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
import $bus from "@/utils/eventBus";
import heroStore from "@/store/hero";
import useIntegrationData from "./hooks/useIntegrationData";
import HeroCard from "./childComps/HeroCard/index.vue"; //英雄卡片
import HeroSidebar from "./childComps/HeroSidebar/index.vue"; //侧边栏
const HeroDetail = defineAsyncComponent(() => import("./childViews/HeroDetail/index.vue")); //详情页

const $route = useRoute();
const $heroStore = heroStore();

const heroListRef = ref();
const id: unknown = $route.query.id; //地址栏参数
const count = ref(0); //一行显示的数目
const show = ref(false); //是否显示列表

const { hero_info, hero_list, show_HeroDetail, viewClick } = useIntegrationData(id);

/* 监听筛选后的英雄列表 */
watch(
  () => $heroStore.filter_list,
  (v) => {
    show.value = false;
    nextTick(() => {
      hero_list.value = v;
      show.value = true;
    });
  },
  { deep: true, immediate: true }
);

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
<style scoped lang="less">
@import url("./index.less");
</style>

<template>
  <div class="Hero">
    <div class="HeroMain" :style="{ opacity: show ? 1 : 0 }">
      <LibGridLayout gap="25px" v-if="hero_list.length" :count="count" :eqhMultiple="1.5">
        <transition-group name="Hero" appear>
          <div class="box" v-for="(item, index) in hero_list" :style="{
            transitionDelay: 0.025 * index + 's',
          }" :key="item.id">
            <HeroCard :data="item" @view="viewClick(item.id)" />
          </div>
        </transition-group>
      </LibGridLayout>
    </div>

    <!--右侧英雄职业分类侧边栏-->
    <transition name="sidebar">
      <HeroSidebar v-show="show_HeroSidebar" />
    </transition>

    <!--英雄详情页-->
    <transition name="clip">
      <HeroDetail v-if="show_HeroDetail" v-model="show_HeroDetail" :data="hero_info" :voices="hero_info.voices" :skins="hero_info.skins" :skills="hero_info.skills" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import $bus from '@/utils/eventBus';
import heroStore from '@/store/hero';
import useIntegrationData from './hooks/useIntegrationData';
import HeroCard from './childComps/HeroCard/index.vue';
import HeroSidebar from './childComps/HeroSidebar/index.vue';
import HeroDetail from './childViews/HeroDetail/index.vue';

const $route = useRoute();
const $heroStore = heroStore();

const id: unknown = $route.query.id; //地址栏参数
const count = ref(0); //一行显示的数目
const show = ref(false); //是否显示列表

const { hero_info, hero_list, show_HeroDetail, show_HeroSidebar, viewClick } = useIntegrationData(id);

/* 监听筛选后的英雄列表 */
watch(
  () => $heroStore.filter_list,
  (v) => {
    show.value = false;
    setTimeout(() => {
      hero_list.value = v;
      show.value = true;
    }, 250);
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
  $bus.on('resize', () => {
    changeCount();
  });
});

onBeforeUnmount(() => {
  $bus.off('resize');
});
</script>
<style scoped lang="less">
@import './index.less';
</style>

<template>
  <div class="Hero">
    <div class="HeroMain" :style="{ opacity: show ? 1 : 0 }">
      <LibGridLayout gap="25px" v-if="hero_list.length" :count="count" :eqhMultiple="1.5">
        <transition-group name="Hero" appear>
          <div
            class="box"
            v-for="(item, index) in hero_list"
            :style="{
              transitionDelay: 0.025 * index + 's',
            }"
            :key="item.id"
          >
            <HeroCard :data="item" @view="viewClick(item.id)" />
          </div>
        </transition-group>
      </LibGridLayout>
    </div>

    <!--//%%%%%··········右侧英雄职业分类侧边栏··········%%%%%//-->
    <transition name="sidebar">
      <HeroSidebar v-show="show_HeroSidebar" />
    </transition>

    <!--//%%%%%··········英雄详情页··········%%%%%//-->
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

<script setup name="Hero">
import {
  onBeforeUnmount, onMounted, ref, watch,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import $bus from '@/utils/eventBus.js';
import switchStore from '@/store/globalSwitch.js';
import heroStore from '@/store/hero.js';
import { hero } from '@/api/main/hero/self';

import HeroCard from './childComps/HeroCard/index.vue';
import HeroSidebar from './childComps/HeroSidebar/index.vue';

import HeroDetail from './childViews/HeroDetail/index.vue';

const $route = useRoute();
const $router = useRouter();
const $switchStore = switchStore();
const $heroStore = heroStore();

const count = ref(0); //一行显示的数目
const show = ref(false);
const show_HeroDetail = ref(false); //显示英雄详情
const show_HeroSidebar = ref(false); //显示英雄分类侧边栏
const hero_list = ref([]); //英雄列表
const hero_info = ref({}); //英雄信息

/* 显示英雄详情 */
const id = $route.query.id;
const viewClick = (id) => {
  const params = { id };
  $switchStore.$loading.show('正在请求英雄数据');
  hero(params).then(async (res) => {
    await $switchStore.$loading.close();
    hero_info.value = res;
    show_HeroDetail.value = true;

    /* 只用于记录，并不会跳转 */
    $router.push({
      path: '/hero',
      query: {
        id: res.id,
      },
    });
  });
};

/* 判断地址栏及是否存在缓存 */
if (id) {
  viewClick(id);
} else {
  $switchStore.$loading.show('正在请求英雄列表');
  hero().then(async (res) => {
    $switchStore.$loading.close();
    $heroStore.setHeroList(res);
    show_HeroSidebar.value = true;
  });
}

watch(
  () => $heroStore.filter_list,
  (v) => {
    show.value = false;
    setTimeout(() => {
      hero_list.value = v;
      show.value = true;
    }, 250);
  },
  { deep: true, immediate: true },
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
  const initCount = () => {
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
  initCount();
  $bus.on('resize', () => {
    initCount();
  });
});

onBeforeUnmount(() => {
  $bus.off('resize');
});
</script>
<style scoped lang="less">
.Hero {
  display: flex;
  width: 100%;
  height: 100%;
  .HeroMain {
    flex: 1;
    padding-right: calc(25px * 8);
    transition: all 0.25s;
  }
}

/* 蒙版裁剪 */
.clip-enter-active {
  animation: clip-in 1s;
}

.clip-leave-active {
  animation: clip-out 1.5s;
}

@keyframes clip-in {
  0% {
    clip-path: polygon(0 0, 0 100%, 0 50%, 0 100%);
  }
  50% {
    clip-path: polygon(0 0, 100% 0, 0 50%, 0% 100%);
  }
  100% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  }
}

@keyframes clip-out {
  0% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  }
  50% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 100% 50%);
  }
  100% {
    clip-path: polygon(100% 100%, 100% 0, 100% 100%, 100% 50%);
  }
}

/* 进入前状态 */
.Hero-enter-from,
.Hero-leave-active {
  opacity: 0;
  transform: translateY(-25px);
}
/* 进入和离开动画属性 */
.Hero-leave-active,
.Hero-enter-active {
  transition: all 0.25s;
}
</style>

<script setup lang="ts">
import { onActivated, ref, onDeactivated, nextTick } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import SkinCard from "./components/SkinCard/index.vue";
import SkinToolbar from "./components/SkinToolbar/index.vue";

import { SkinDebrisStore, KnapsackStore } from "@/store";
import { FilterSidebar, KBackTop, KEmpty } from "@/components/business";
import { LibVirtualList } from "@/components/common";
import { $confirmText, GAME_PROP, ROUTE_PATH } from "@/config";
import { $confirm } from "@/utils/busTransfer";
import { _debounce, _promiseTimeout } from "@/utils/tool";
import { usePlayAudio } from "@/hooks";

defineOptions({
  name: "SkinDebrisShop",
});

const $router = useRouter();

const $knapsackStore = KnapsackStore();
const $skinDebrisStore = SkinDebrisStore();

const { scroll, filter_list } = storeToRefs($skinDebrisStore);

const { playAudio } = usePlayAudio();

//实时修改一行个数
const interval_count = [
  [2400, 5],
  [2000, 4],
  [1600, 3],
  [1400, 2],
  [720, 1],
];

const skinToolbarRef = ref<InstanceType<typeof SkinToolbar>>();
const libVirtualListRef = ref<GenericComponentInstanceType<typeof LibVirtualList>>();

/** 一行显示的数目 */
const count = ref(0);
/** 显示列表 */
const show_skin_list = ref(false);
/** 是否显示返回顶部 */
const back_top = ref(false);

$skinDebrisStore.getSkin();

/** @description 实时修改一行个数 */
const debounceChangeCount = _debounce(() => {
  const v = document.documentElement.clientWidth;

  if (v >= 2400) {
    count.value = 6;
  }
  for (const [a, b] of interval_count) {
    if (v < a) {
      count.value = b;
    }
  }
}, 100);

/** @description 滚动触发 */
const debounceScroll = _debounce((v: number) => {
  $skinDebrisStore.setScroll(v);
  back_top.value = v > 250;
}, 250);

/** @description 页面筛选隐藏显示动画 */
const onFilterChange = () => {
  debounceScroll(0);
  show_skin_list.value = false;
  nextTick(() => {
    show_skin_list.value = true;
  });
};

/** @description 点击侧边栏触发 */
const onSidebarChange = () => {
  onFilterChange();
  skinToolbarRef.value?._clearName();
};

/** @description 返回顶部 */
const onBackTop = () => {
  libVirtualListRef.value?._setPosition(0, false);
};

/** @description 兑换 */
const onExchange = (e: Event, data: Game.Hero.Skin) => {
  if ($knapsackStore.articles.SKIN_DEBRIS >= Number(data.debris)) {
    $confirm({
      text: $confirmText("r36m", {
        name: data.name,
        prop: GAME_PROP.NAME["SKIN_DEBRIS"],
        count: data.debris,
      }),
      confirm() {
        $knapsackStore.setGamePropNum("SKIN_DEBRIS", Number(data.debris), "SUB").then(() => {
          $knapsackStore.addSkin(data.id, e);
        });
      },
    });
  } else {
    $confirm({
      text: $confirmText("p89n", { prop: GAME_PROP.NAME["SKIN_DEBRIS"] }),
      confirm() {
        $router.push(ROUTE_PATH.SKIN_LOTTERY);
      },
    });
  }
};

onActivated(async () => {
  debounceChangeCount();
  playAudio("h3w0");
  window.addEventListener("resize", debounceChangeCount);

  libVirtualListRef.value?._setPosition(scroll.value);
  libVirtualListRef.value?._updateStatus();

  //显示英雄列表
  await _promiseTimeout(250);
  show_skin_list.value = true;
});

onDeactivated(() => {
  window.removeEventListener("resize", debounceChangeCount);
});
</script>

<template>
  <div class="skin">
    <div class="skin-main">
      <transition name="to-bottom" appear>
        <SkinToolbar ref="skinToolbarRef" @change="onFilterChange" />
      </transition>

      <KBackTop :active="back_top" @back-top="onBackTop" />

      <transition name="card-list">
        <LibVirtualList
          v-if="filter_list.length && show_skin_list"
          ref="libVirtualListRef"
          :data="filter_list"
          :column-count="count"
          @scroll="debounceScroll"
          v-slot="{ data }"
        >
          <div
            v-for="(item, index) in data"
            :key="item.id"
            class="skin-card"
            :style="{
              'transition-delay': (index % (count * 2)) * 0.1 + 's',
            }"
          >
            <SkinCard :data="item" @exchange="onExchange" />
          </div>
        </LibVirtualList>
      </transition>
      <KEmpty v-if="filter_list.length === 0" tip="暂无可兑换皮肤" />
    </div>

    <!--右侧职业分类侧边栏-->
    <FilterSidebar type="skinDebris" @change="onSidebarChange" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

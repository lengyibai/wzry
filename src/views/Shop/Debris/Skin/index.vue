<script setup lang="ts">
import { onActivated, ref, nextTick, watch } from "vue";
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
import { useChangeListLineNum, usePlayAudio } from "@/hooks";
import { vCardIntoAnimate } from "@/directives";

defineOptions({
  name: "SkinDebrisShop",
});

interface Props {
  /** 为了解决虚拟列表更新问题，进入活动页或任务页时，页面会隐藏，再次进入列表可能会无法加载 */
  visible: boolean;
}
const $props = defineProps<Props>();

const $router = useRouter();

const $knapsackStore = KnapsackStore();
const $skinDebrisStore = SkinDebrisStore();

const { scroll, show_list, finish, loading } = storeToRefs($skinDebrisStore);

const { playAudio } = usePlayAudio();
const { line_num } = useChangeListLineNum(6, [
  [2400, 5],
  [2000, 4],
  [1600, 3],
  [1400, 2],
  [720, 1],
]);

const skinToolbarRef = ref<InstanceType<typeof SkinToolbar>>();
const libVirtualListRef = ref<GenericComponentInstanceType<typeof LibVirtualList>>();

/** 显示列表 */
const show_skin_list = ref(false);
/** 是否显示返回顶部 */
const back_top = ref(false);

$skinDebrisStore.getSkin();

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

/** @description 加载更多 */
const onLoadMore = () => {
  $skinDebrisStore.loadMore().then(() => {
    libVirtualListRef.value?._updateStatus();
  });
};

watch(
  () => $props.visible,
  (v) => {
    show_skin_list.value = v;

    nextTick(() => {
      libVirtualListRef.value?._setPosition(scroll.value);
    });
  },
);

onActivated(async () => {
  playAudio("h3w0");
  libVirtualListRef.value?._setPosition(scroll.value);

  await _promiseTimeout(250);
  show_skin_list.value = true;
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
          v-if="show_list.length && show_skin_list"
          ref="libVirtualListRef"
          :data="show_list"
          :column-count="line_num"
          :loading="loading"
          :finish="finish"
          @scroll="debounceScroll"
          @load-more="onLoadMore"
          v-slot="{ data }"
        >
          <div
            v-for="(item, index) in data"
            :key="item.id"
            v-card-into-animate
            class="skin-card"
            :style="{
              'transition-delay': (index % (line_num * 2)) * 0.1 + 's',
            }"
          >
            <SkinCard :data="item" @exchange="onExchange" />
          </div>
        </LibVirtualList>
      </transition>
      <KEmpty v-if="show_list.length === 0" tip="暂无可兑换皮肤" />
    </div>

    <!--右侧职业分类侧边栏-->
    <FilterSidebar type="skinDebris" @change="onSidebarChange" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

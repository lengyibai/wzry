<script setup lang="ts">
import { onActivated, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import SkinCard from "./components/SkinCard/index.vue";
import SkinToolbar from "./components/SkinToolbar/index.vue";

import { KingCrystalStore, KnapsackStore } from "@/store";
import { FilterSidebar, KBackTop, KEmpty } from "@/components/business";
import { LibVirtualList } from "@/components/common";
import { $confirmText, GAME_PROP, ROUTE_PATH } from "@/config";
import { $confirm } from "@/utils/busTransfer";
import { _debounce, _promiseTimeout } from "@/utils/tool";
import { useChangeListLineNum, usePlayAudio } from "@/hooks";
import { vCardIntoAnimate } from "@/directives";

defineOptions({
  name: "KingCrystal",
});

const $router = useRouter();

const $knapsackStore = KnapsackStore();
const $kingCrystalStore = KingCrystalStore();

const { scroll, show_list, finish, loading } = storeToRefs($kingCrystalStore);

const { playAudio } = usePlayAudio();
const { line_num } = useChangeListLineNum(4, [
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

$kingCrystalStore.getSkin();

/** @description 滚动触发 */
const debounceScroll = _debounce((v: number) => {
  $kingCrystalStore.setScroll(v);
  back_top.value = v > 250;
}, 250);

/** @description 点击侧边栏触发 */
const onSidebarChange = () => {
  debounceScroll(0);
  skinToolbarRef.value?._clearName();
};

/** @description 兑换
 * @param e 事件对象
 * @param data 英雄或皮肤数据
 */
const onExchange = (e: Event, data: Game.Hero.Skin) => {
  if ($knapsackStore.articles.KING_CRYSTAL > 0) {
    $confirm({
      text: $confirmText("r36m", {
        name: `${data.heroName}-${data.name}`,
        prop: GAME_PROP.NAME["KING_CRYSTAL"],
        count: 1,
      }),
      confirm() {
        $knapsackStore.setGamePropNum("KING_CRYSTAL", 1, "SUB").then(() => {
          $knapsackStore.addSkin(data.id, e);
          skinToolbarRef.value?._clearName();
        });
      },
    });
  } else {
    $confirm({
      text: $confirmText("p89n", { prop: GAME_PROP.NAME["KING_CRYSTAL"] }),
      confirm() {
        $router.push(ROUTE_PATH.HERO_LOTTERY);
      },
    });
  }
};

/** @description 加载更多 */
const onLoadMore = () => {
  $kingCrystalStore.loadMore().then(() => {
    libVirtualListRef.value?._updateStatus();
  });
};

/** @description 返回顶部 */
const onBackTop = () => {
  libVirtualListRef.value?._setPosition(0, false);
};

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
        <SkinToolbar ref="skinToolbarRef" @change="debounceScroll(0)" />
      </transition>

      <KBackTop :active="back_top" @back-top="onBackTop" />

      <transition name="fade">
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
            ref="skinCardRefs"
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
    <FilterSidebar type="skin" @change="onSidebarChange" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

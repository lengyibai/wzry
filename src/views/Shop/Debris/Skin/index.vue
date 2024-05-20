<script setup lang="ts">
import { onActivated, ref, onDeactivated } from "vue";
import _debounce from "lodash/debounce";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import SkinCard from "./components/SkinCard/index.vue";
import SkinToolbar from "./components/SkinToolbar/index.vue";

import { SkinDebrisStore, KnapsackStore } from "@/store";
import { FilterSidebar, KBackTop, KEmpty } from "@/components/business";
import { LibGrid } from "@/components/common";
import { $confirmText, GAME_PROP, ROUTE_PATH } from "@/config";
import { $confirm } from "@/utils/busTransfer";
import { _promiseTimeout } from "@/utils/tool";
import { usePlayAudio } from "@/hooks";

defineOptions({
  name: "SkinDebrisShop",
});

const $router = useRouter();

const $knapsackStore = KnapsackStore();
const $skinDebrisStore = SkinDebrisStore();

const { scroll, finish, show_list, loading } = storeToRefs($skinDebrisStore);

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
const skinListRef = ref<InstanceType<typeof LibGrid>>();

/** 一行显示的数目 */
const count = ref(0);
/** 显示列表 */
const show_skin_list = ref(false);
/** 是否显示返回顶部 */
const back_top = ref(false);

$skinDebrisStore.getSkin();

/** @description 实时修改一行个数 */
const changeCount = () => {
  const v = document.documentElement.clientWidth;

  if (v >= 2400) {
    count.value = 6;
  }
  for (const [a, b] of interval_count) {
    if (v < a) {
      count.value = b;
    }
  }
};

/** @description 滚动触发 */
const debounceScroll = _debounce((v: number) => {
  $skinDebrisStore.setScroll(v);
  back_top.value = v > 250;
}, 250);

/** @description 点击侧边栏触发 */
const onSidebarChange = () => {
  debounceScroll(0);
  skinToolbarRef.value?._clearName();
};

/** @description 返回顶部 */
const onBackTop = () => {
  skinListRef.value?._setPosition(0, true);
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
  playAudio("h3w0");
  skinListRef.value?._setPosition(scroll.value);
  changeCount();
  window.addEventListener("resize", changeCount);

  //显示英雄列表
  await _promiseTimeout(250);
  show_skin_list.value = true;
});

onDeactivated(() => {
  window.removeEventListener("resize", changeCount);
});
</script>

<template>
  <div class="skin">
    <div class="skin-main">
      <transition name="to-bottom" appear>
        <SkinToolbar ref="skinToolbarRef" @change="debounceScroll(0)" />
      </transition>

      <KBackTop :active="back_top" @back-top="onBackTop" />

      <transition name="card-list">
        <LibGrid
          v-if="show_list.length && show_skin_list"
          ref="skinListRef"
          :finish="finish"
          gap="1rem"
          :loading="loading"
          :count="count"
          :scroll-top="scroll"
          @load-more="$skinDebrisStore.loadMore"
          @scroll="debounceScroll"
        >
          <transition-group name="skin-card" appear>
            <div
              v-for="(item, index) in show_list"
              :key="item.id"
              class="skin-card"
              :style="{
                'transition-delay': (index % (count * 2)) * 0.1 + 's',
              }"
            >
              <SkinCard :data="item" @exchange="onExchange" />
            </div>
          </transition-group>
        </LibGrid>
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

<script setup lang="ts">
import { onActivated, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import SkinCard from "./components/SkinCard/index.vue";
import SkinToolbar from "./components/SkinToolbar/index.vue";

import { KingCrystalStore, KnapsackStore } from "@/store";
import { FilterSidebar, KBackTop, KEmpty } from "@/components/business";
import { LibGrid } from "@/components/common";
import { $confirmText, GAME_PROP, ROUTE_PATH } from "@/config";
import { $confirm } from "@/utils/busTransfer";
import { _debounce, _promiseTimeout } from "@/utils/tool";
import { useChangeListLineNum, usePlayAudio } from "@/hooks";

defineOptions({
  name: "KingCrystal",
});

const $router = useRouter();

const $knapsackStore = KnapsackStore();
const $kingCrystalStore = KingCrystalStore();

const { scroll, finish, show_list, loading } = storeToRefs($kingCrystalStore);

const { playAudio } = usePlayAudio();
const { line_num } = useChangeListLineNum(4, [
  [2000, 4],
  [1600, 3],
  [1400, 2],
  [720, 1],
]);

const skinToolbarRef = ref<InstanceType<typeof SkinToolbar>>();
const skinListRef = ref<InstanceType<typeof LibGrid>>();

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
  if ($knapsackStore.articles.SKIN_DEBRIS >= Number(data.debris)) {
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
      text: $confirmText("p89n", { prop: GAME_PROP.NAME["HERO_DEBRIS"] }),
      confirm() {
        $router.push(ROUTE_PATH.PROP_SHOP);
      },
    });
  }
};

/** @description 返回顶部 */
const onBackTop = () => {
  skinListRef.value?._setPosition(0, true);
};

onActivated(async () => {
  playAudio("h3w0");
  skinListRef.value?._setPosition(scroll.value);

  //显示英雄列表
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

      <transition name="card-list">
        <LibGrid
          v-if="show_list.length && show_skin_list"
          ref="skinListRef"
          :finish="finish"
          gap="1rem"
          :loading="loading"
          :count="line_num"
          :scroll-top="scroll"
          @load-more="$kingCrystalStore.loadMore"
          @scroll="debounceScroll"
        >
          <transition-group name="skin-card" appear>
            <div
              v-for="(item, index) in show_list"
              :key="item.id"
              ref="skinCardRefs"
              class="skin-card"
              :style="{
                'transition-delay': (index % (line_num * 2)) * 0.1 + 's',
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
    <FilterSidebar type="skin" @change="onSidebarChange" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

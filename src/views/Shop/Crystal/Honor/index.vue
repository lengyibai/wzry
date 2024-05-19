<script setup lang="ts">
import { onActivated, ref, onDeactivated, computed } from "vue";
import { useRouter } from "vue-router";

import SkinCard from "./components/SkinCard/index.vue";

import { AudioStore, KnapsackStore } from "@/store";
import { LibGrid } from "@/components/common";
import { GAME_HERO } from "@/api";
import { $confirmText, GAME_PROP, ROUTE_PATH } from "@/config";
import { $confirm } from "@/utils/busTransfer";
import { _promiseTimeout } from "@/utils/tool";
import { KEmpty } from "@/components/business";

defineOptions({
  name: "HonorCrystal",
});

const $router = useRouter();

const $audioStore = AudioStore();
const $knapsackStore = KnapsackStore();

//实时修改一行个数
const interval_count = [
  [2400, 5],
  [2000, 4],
  [1600, 3],
  [1400, 2],
  [720, 1],
];

const skinListRef = ref<InstanceType<typeof LibGrid>>();

/** 一行显示的数目 */
const count = ref(0);
/** 显示列表 */
const show_skin_list = ref(false);
/** 皮肤列表 */
const skin_list = ref<Game.Hero.Skin[]>([]);

//筛出荣耀典藏
const collection_list = computed(() => {
  return skin_list.value.filter(
    (item) => item.type === 26 && !$knapsackStore.skin_list.includes(item.id),
  );
});

/** @description 获取皮肤列表 */
const getSkinList = async () => {
  skin_list.value = await GAME_HERO.getSkinList();
};
getSkinList();

/** @description 实时修改一行个数 */
const changeCount = () => {
  const v = document.documentElement.clientWidth;

  if (v >= 2400) {
    count.value = 5;
  }
  for (const [a, b] of interval_count) {
    if (v < a) {
      count.value = b;
    }
  }
};

/** @description 兑换
 * @param e 事件对象
 * @param data 皮肤数据
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
        $knapsackStore.setGamePropNum("HONOR_CRYSTAL", 1, "SUB").then(() => {
          $knapsackStore.addSkin(data.id, e);
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

onActivated(async () => {
  $audioStore.play("h3w0");
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
      <transition name="card-list">
        <LibGrid
          v-if="collection_list.length && show_skin_list"
          ref="skinListRef"
          gap="1rem"
          :count="count"
          :load-more="false"
        >
          <transition-group name="skin-card" appear>
            <div
              v-for="(item, index) in collection_list"
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
      <KEmpty v-if="collection_list.length === 0" tip="暂无可兑换皮肤" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

<script lang="ts" setup>
import { useHideLayout } from "@/layout/common/hooks/useHideLayout";
import { $loading } from "@/utils/loading";

const { hide_all } = useHideLayout();

const keep_alive = [
  "Hero",
  "Skin",
  "Savor",
  "Equip",
  "Epigraph",
  "Knapsack",
  "LotteryHero",
  "LotterySkin",
  "ShopCrystal",
  "KingCrystal",
  "YiBao",
  "HonorCrystal",
  "ShopDebris",
  "HeroDebrisShop",
  "SkinDebrisShop",
  "PropShop",
];

/** @description 路由组件加载完成后调用 */
const onComponentMounted = () => {
  $loading.close();
};
</script>

<template>
  <transition name="app-main">
    <div v-show="!hide_all" class="app-main">
      <router-view v-slot="{ Component }">
        <KeepAlive :include="keep_alive">
          <component :is="Component" :visible="!hide_all" @vue:mounted="onComponentMounted" />
        </KeepAlive>
      </router-view>
    </div>
  </transition>
</template>

<style scoped>
@import url("./index.less");
</style>

<script lang="ts" setup>
import { $loading } from "@/utils/loading";

const keep_alive = [
  "Hero",
  "Skin",
  "Savor",
  "Equip",
  "Epigraph",
  "LotteryHero",
  "LotterySkin",
  "ShopCrystal",
  "KingCrystal",
  "Task",
  "HonorCrystal",
  "ShopDebris",
  "HeroDebrisShop",
  "SkinDebrisShop",
  "PropShop",
];

const onComponentMounted = () => {
  $loading.close();
};
</script>

<template>
  <transition name="app-main" appear>
    <div class="app-main">
      <router-view v-slot="{ Component }">
        <KeepAlive :include="keep_alive">
          <component :is="Component" @vue:mounted="onComponentMounted" />
        </KeepAlive>
      </router-view>
    </div>
  </transition>
</template>

<style scoped>
@import url("./index.less");
</style>

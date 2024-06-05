<script setup lang="ts">
import KYiBao from "../../YiBao/index.vue";

import KLoading from "./components/K-Loading/index.vue";
import KMessage from "./components/K-Message/index.vue";
import KTip from "./components/K-Tip/index.vue";
import KConfirm from "./components/K-Confirm/index.vue";
import KImageView from "./components/K-ImageView/index.vue";
import KMouseTip from "./components/K-MouseTip/index.vue";
import KInputDialog from "./components/K-InputDialog/index.vue";
import KFoucs from "./components/K-Foucs/index.vue";
import KObtain from "./components/K-Obtain/index.vue";
import KBuyProp from "./components/K-BuyProp/index.vue";
import KUpgrade from "./components/K-Upgrade/index.vue";
import KBatchProp from "./components/K-BatchProp/index.vue";
import KOptional from "./components/K-Optional/index.vue";
import KHeroDetail from "./components/K-HeroDetail/index.vue";
import KHelp from "./components/K-Help/index.vue";
import KSelectAvatar from "./components/K-SelectAvatar/index.vue";
// import KPhone from "./components/K-Phone/index.vue";

import { $bus } from "@/utils/eventBus";
import { _isPhone } from "@/utils/tool";

window.addEventListener("mouseup", (e) => {
  $bus.emit("mouseup", e);
});
</script>

<template>
  <!-- loading -->
  <KLoading />

  <!-- 消息提醒 -->
  <KMessage />

  <!-- NPC -->
  <KTip />

  <!-- 确认弹窗 -->
  <KConfirm />

  <!-- 查看图片 -->
  <KImageView />

  <!-- 跟随鼠标点、圆、线 -->
  <KMouseTip />

  <!-- 弹窗输入内容 -->
  <KInputDialog />

  <!-- 聚焦 -->
  <KFoucs />

  <!-- 获得道具或奖励 -->
  <KObtain />

  <!-- 购买道具弹窗 -->
  <KBuyProp />

  <!-- 英雄升级 -->
  <KUpgrade />

  <!-- 批量使用道具 -->
  <KBatchProp />

  <!-- 自选英雄/皮肤宝箱 -->
  <KOptional />

  <!-- 英雄详情 -->
  <KHeroDetail />

  <!-- 帮助弹窗 -->
  <KHelp />

  <!-- 选择头像 -->
  <KSelectAvatar />

  <!-- 乂宝 -->
  <teleport v-if="!_isPhone" to="body">
    <KYiBao type="small" />
  </teleport>

  <!-- 禁止手机查看 -->
  <!-- <KPhone /> -->
</template>

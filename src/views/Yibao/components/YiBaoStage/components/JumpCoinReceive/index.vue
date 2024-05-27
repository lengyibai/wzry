<script setup lang="ts">
import { storeToRefs } from "pinia";

import { _getPropLink } from "@/utils/concise";
import { KButton } from "@/components/business";
import { YibaoStore } from "@/store";
import { GAME_CONFIG, GAME_PROP } from "@/config";
import { $obtain } from "@/utils/busTransfer";
import { vMouseTip } from "@/directives";

const $yibaoStore = YibaoStore();
const { jump_count, receive_coin } = storeToRefs($yibaoStore);
const { resetJumpCoinReceive } = $yibaoStore;

/** @description 领取跳跳币 */
const handleReceive = () => {
  if (receive_coin.value === 0) return;
  $obtain({
    icon: _getPropLink("jump_coin"),
    name: GAME_PROP.NAME["JUMP_COIN"],
    num: receive_coin.value,
    key: "JUMP_COIN",
  });
  resetJumpCoinReceive();
};
</script>

<template>
  <div class="jump-coin-receive">
    <div class="reward">
      <img :src="_getPropLink('jump_coin')" alt="" class="icon" />
      <span class="num">×{{ receive_coin }}</span>
    </div>
    <KButton
      v-mouse-tip="{
        disabled: receive_coin === 0,
      }"
      type="warning"
      class="k-button"
      :disabled="receive_coin === 0"
      @click="handleReceive"
    >
      领取
    </KButton>
    <div class="desc">还需跳跃{{ GAME_CONFIG.JUMP_COIN_RECEIVE_CLAIM - jump_count }}次</div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

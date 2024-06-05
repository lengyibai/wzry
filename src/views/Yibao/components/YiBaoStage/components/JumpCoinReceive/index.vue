<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { onMounted } from "vue";

import { _getPropLink } from "@/utils/concise";
import { KButton } from "@/components/business";
import { YibaoStore } from "@/store";
import { GAME_CONFIG, GAME_PROP, SCENE_TIP } from "@/config";
import { $focus, $obtain, $tip } from "@/utils/busTransfer";
import { vMouseTip } from "@/directives";
import { _isPhone } from "@/utils/tool";

const $yibaoStore = YibaoStore();
const { jump_count, receive_coin } = storeToRefs($yibaoStore);
const { resetJumpCoinReceive } = $yibaoStore;

const jumpCoinReceiveRef = ref<HTMLElement>();

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

onMounted(() => {
  if (!_isPhone) return;
  //延迟五秒是因为乂宝入场动画
  setTimeout(() => {
    $tip({
      align: "right-bottom",
      color: false,
      text: SCENE_TIP.ma67,
      createFn() {
        $focus.show(jumpCoinReceiveRef.value!);
      },
      btnFn() {
        $focus.close();
      },
    });
  }, 5000);
});
</script>

<template>
  <div ref="jumpCoinReceiveRef" class="jump-coin-receive">
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

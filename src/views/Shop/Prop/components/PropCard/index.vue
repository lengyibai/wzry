<script setup lang="ts">
import { vMaskGradient, vMouseTip } from "@/directives";
import { KButton } from "@/components/business";
import { GAME_PROP } from "@/config";
import { BuyProp } from "@/components/business/Global/Control/components/K-BuyProp/interface";
import { GoodsInfo } from "@/config/interface";
import { $buyProp } from "@/utils/busTransfer";
import { _getPropLink } from "@/utils/concise";

interface Props {
  /** 商品数据 */
  data: GoodsInfo;
}

defineProps<Props>();

/** @description 购买 */
const handlePay = (data: BuyProp) => {
  $buyProp(data);
};
</script>

<template>
  <div v-mask-gradient class="prop-card">
    <img class="blur" :src="_getPropLink(GAME_PROP.ICON[data.key])" />
    <img
      v-mouse-tip="{
        type: 'TIP',
        text: GAME_PROP.DESC[data.key],
      }"
      class="icon"
      :src="_getPropLink(GAME_PROP.ICON[data.key])"
    />
    <div class="name">{{ GAME_PROP.NAME[data.key] }}×{{ data.num }}</div>
    <KButton
      v-mouse-tip
      type="warning"
      class="k-button"
      @click="
        handlePay({
          key: data.key,
          price: data.price,
          type: data.way,
          num: data.num,
        })
      "
    >
      <img :src="_getPropLink(GAME_PROP.ICON[data.way])" alt="" class="icon" />
      <div class="price">{{ data.price }}</div>
    </KButton>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

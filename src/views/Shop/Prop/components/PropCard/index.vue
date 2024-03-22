<script setup lang="ts">
import { vMaskGradient, vMouseTip } from "@/directives";
import { KButton } from "@/components/business";
import { GAME_PROP } from "@/config";
import { BuyProp } from "@/components/business/Global/Control/components/K-BuyProp/interface";
import { GoodsInfo } from "@/config/interface";
import { $buyProp } from "@/utils/busTransfer";

interface Props {
  /** 皮肤数据 */
  data: GoodsInfo;
}

defineProps<Props>();

/* 购买 */
const handlePay = (data: BuyProp) => {
  $buyProp(data);
};
</script>

<template>
  <div v-mask-gradient class="prop-card">
    <img class="blur" :src="data.data.icon" />
    <img class="icon" :src="data.data.icon" />
    <div class="name">{{ data.data.label }}×{{ data.num }}</div>
    <KButton
      v-mouse-tip
      type="warning"
      class="k-button"
      @click="
        handlePay({
          prop: data.data,
          price: data.price,
          type: data.way,
          num: data.num,
        })
      "
    >
      <img :src="GAME_PROP[data.way].icon" alt="" class="type" />
      <div class="price">{{ data.price }}</div>
    </KButton>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

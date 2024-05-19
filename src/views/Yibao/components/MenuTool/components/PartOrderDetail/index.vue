<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";

import PartCollect from "../../../../common/PartCollect/index.vue";

import { KnapsackStore, YibaoStore } from "@/store";
import { _getPropLink } from "@/utils/concise";
import { KButton, KDialog } from "@/components/business";
import { vMouseTip, vScrollVirtualization } from "@/directives";
import { $confirmText, $msgTipText, CONFIRM_TIP, MESSAGE_TIP, YIBAO_PART } from "@/config";
import { $confirm, $message } from "@/utils/busTransfer";
import { bigYiBaoBody } from "@/components/business/YiBao/helper/yiBaoBig";

const $yibaoStore = YibaoStore();
const $knapsackStore = KnapsackStore();

const { pay_order } = storeToRefs($yibaoStore);
const { articles } = storeToRefs($knapsackStore);
const { setGamePropNum } = $knapsackStore;

const kDialogRef = ref<InstanceType<typeof KDialog>>();

/** 价格统计 */
const total_price = computed(() => {
  let jumpCoin = 0;
  let guessCoin = 0;
  pay_order.value.forEach((item) => {
    if (item.partStyle === "COLOR") {
      jumpCoin += Number(item.partPrice);
    } else {
      guessCoin += Number(item.partPrice);
    }
  });

  return { jumpCoin, guessCoin };
});

/** @description 删除订单
 * @param partType 部件类型
 * @param order 订单名称
 */
const handleRemoveOrder = (partType: Game.YiBao.PartType, order: string) => {
  $confirm({
    text: $confirmText("vt39", { order }),
    confirm() {
      $yibaoStore.setPayPart(partType, true);
      $yibaoStore.resetCurrentPartStyle(partType);

      if (pay_order.value.length === 0) {
        kDialogRef.value!._close();
      }
    },
  });
};

/** @description 全部购买 */
const handlePayAll = async () => {
  if (total_price.value.jumpCoin > articles.value.JUMP_COIN) {
    $message($msgTipText("wa83", { v: "跳跳币" }), "error");
    return;
  }
  if (total_price.value.guessCoin > articles.value.GUESS_COIN) {
    $message($msgTipText("wa83", { v: "竞猜币" }), "error");
    return;
  }

  await setGamePropNum("JUMP_COIN", total_price.value.jumpCoin, "SUB");
  await setGamePropNum("GUESS_COIN", total_price.value.guessCoin, "SUB");
  $yibaoStore.buyAllPart();

  await kDialogRef.value!._close();

  bigYiBaoBody.playChangePartAnimation();
  $message(MESSAGE_TIP.dl57);
};

/** @description 一键清空 */
const handleClearAll = () => {
  $confirm({
    text: CONFIRM_TIP.nl88,
    confirm() {
      $yibaoStore.resetPayPart();
      kDialogRef.value!._close();
    },
  });
};
</script>

<template>
  <teleport to="body">
    <KDialog ref="kDialogRef" v-bind="$attrs" title="订单详情" width="50rem" :ratio="1" top="7rem">
      <div class="pay-order-detail">
        <div v-scroll-virtualization class="pay-order-list">
          <div v-for="(item, index) in pay_order" :key="index" class="order-item">
            <div class="left">
              <div class="part-box">
                <PartCollect :part-key="item.partName" />
              </div>
              <div class="part-name">
                {{ YIBAO_PART.PART_KEY_INFO[item.id].name }}-{{
                  YIBAO_PART.PARTS_KEY_NAME[item.partName]
                }}
              </div>
            </div>

            <div class="right">
              <img
                class="coin-icon"
                :src="_getPropLink(`${item.partStyle === 'COLOR' ? 'jump_coin' : 'guess_coin'}`)"
                alt=""
              />
              <div class="price">{{ item.partPrice }}</div>
            </div>

            <div
              v-mouse-tip
              class="remove"
              @click="
                handleRemoveOrder(
                  item.partName,
                  `${YIBAO_PART.PART_KEY_INFO[item.id].name}-${
                    YIBAO_PART.PARTS_KEY_NAME[item.partName]
                  }`,
                )
              "
            >
              删除订单
            </div>
          </div>
        </div>

        <div class="pay-btn">
          <div class="total-price">
            <div v-if="total_price.jumpCoin > 0" class="jump-coin">
              <img class="coin-icon" :src="_getPropLink('jump_coin')" alt="" />
              <div class="price">{{ total_price.jumpCoin }}</div>
            </div>

            <div v-if="total_price.guessCoin > 0" class="guess-coin">
              <img class="coin-icon" :src="_getPropLink('guess_coin')" alt="" />
              <div class="price">{{ total_price.guessCoin }}</div>
            </div>
          </div>

          <div class="btns">
            <KButton v-mouse-tip type="warning" @click="handlePayAll">全部购买</KButton>
            <KButton v-mouse-tip type="error" @click="handleClearAll">一键清空</KButton>
          </div>
        </div>
      </div>
    </KDialog>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

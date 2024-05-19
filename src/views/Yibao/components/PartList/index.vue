<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, watchEffect } from "vue";

import ColorsTextures from "./components/ColorsTextures/index.vue";

import { KnapsackStore, YibaoStore } from "@/store";
import { KButton, KSelect } from "@/components/business";
import { _getPropLink } from "@/utils/concise";
import { $confirmText, $msgTipText, MESSAGE_TIP, YIBAO_PART } from "@/config";
import { $confirm, $message } from "@/utils/busTransfer";
import { bigYiBaoBody } from "@/components/business/YiBao/helper/yiBaoBig";

const $yibaoStore = YibaoStore();
const $knapsackStore = KnapsackStore();

const { articles } = storeToRefs($knapsackStore);
const { part_type, part_style_type, part_selected } = storeToRefs($yibaoStore);
const { setPartStyle, buyAlonePart } = $yibaoStore;
const { setGamePropNum } = $knapsackStore;

const index = ref(0);

const part_key_name = {
  annulus: "圆环",
  antenna: "天线",
  blush: "腮红",
  eye: "眼睛",
  mouth: "嘴巴",
  side: "六面",
  wing: "羽翅",
};

/** @description 设置部件类型 */
const onSetPartStyle = () => {
  setPartStyle(index.value === 0 ? "COLOR" : "IMG");
};

/** @description 单个购买 */
const handleBuyAlonePart = async () => {
  const id = part_selected.value.id;
  const type = part_selected.value.type;
  const price = Number(part_selected.value.price);

  if (type === "COLOR") {
    if (price <= articles.value.JUMP_COIN) {
      setGamePropNum("JUMP_COIN", price, "SUB");
    } else {
      $message($msgTipText("wa83", { v: "跳跳币" }), "error");
    }
  } else {
    if (price <= articles.value.GUESS_COIN) {
      setGamePropNum("GUESS_COIN", price, "SUB");
    } else {
      $message($msgTipText("wa83", { v: "竞猜币" }), "error");
    }
  }

  $confirm({
    text: $confirmText("vk62", {
      name: type === "COLOR" ? "跳跳币" : "竞猜币",
      price: price,
      part: `${YIBAO_PART.PART_KEY_INFO[id].name}-${YIBAO_PART.PARTS_KEY_NAME[part_type.value]}`,
    }),
    confirm() {
      buyAlonePart();
      bigYiBaoBody.playChangePartAnimation();
      $message(MESSAGE_TIP.dl57);
    },
  });
};

watchEffect(() => {
  index.value = part_style_type.value === "COLOR" ? 0 : 1;
});
</script>

<template>
  <div class="part-list">
    <div class="title">
      <span class="label" :data-text="`${part_key_name[part_type]}部件`">
        {{ part_key_name[part_type] }}部件
      </span>
      <KSelect
        v-if="YIBAO_PART.PART_SUPPORT_IMG.includes(part_type)"
        v-model="index"
        width="7rem"
        :option="['配色', '贴图']"
        @update:model-value="onSetPartStyle"
      />
    </div>

    <ColorsTextures :mode="part_style_type" :part-key="part_type" />

    <div class="pay-status">
      <KButton
        v-if="!part_selected.owned"
        type="warning"
        class="k-button"
        @click="handleBuyAlonePart"
      >
        <img
          :src="_getPropLink(`${part_selected.type === 'COLOR' ? 'jump_coin' : 'guess_coin'}`)"
          alt=""
          class="icon"
        />
        <div class="price">{{ part_selected.price }}</div>
      </KButton>
      <div v-else class="owned">已拥有</div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

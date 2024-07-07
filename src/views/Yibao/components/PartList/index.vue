<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, ref, watchEffect } from "vue";

import ColorsTextures from "./components/ColorsTextures/index.vue";

import { KnapsackStore, YibaoStore } from "@/store";
import { KButton, KSelect } from "@/components/business";
import { _getPropLink } from "@/utils/concise";
import { $confirmText, $msgTipText, MESSAGE_TIP, SCENE_TIP, YIBAO_PART } from "@/config";
import { $tip, $focus, $confirm, $message } from "@/utils/busTransfer";
import { bigYiBaoBody } from "@/components/business/YiBao/helper/yiBaoBig";

const $yibaoStore = YibaoStore();
const $knapsackStore = KnapsackStore();

const { articles } = storeToRefs($knapsackStore);
const { part_type, part_style_type, part_selected } = storeToRefs($yibaoStore);
const { setPartStyle, buyAlonePart, setPartType } = $yibaoStore;
const { setGamePropNum } = $knapsackStore;

const kSelectRef = ref<InstanceType<typeof KSelect>>();

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
const onSetPartStyle = (i: number) => {
  setPartStyle(i === 0 ? "COLOR" : "IMG");
};

/** @description 单个购买 */
const handleBuyAlonePart = async () => {
  const id = part_selected.value.id;
  const type = part_selected.value.type;
  const price = Number(part_selected.value.price);

  if (type === "COLOR" && price > articles.value.JUMP_COIN) {
    $message($msgTipText("wa83", { v: "跳跳币" }), "error");
    return;
  }

  if (type === "IMG" && price > articles.value.GUESS_COIN) {
    $message($msgTipText("wa83", { v: "竞猜币" }), "error");
    return;
  }

  $confirm({
    text: $confirmText("vk62", {
      name: type === "COLOR" ? "跳跳币" : "竞猜币",
      price: price,
      part: `${YIBAO_PART.PART_KEY_INFO[id].name}-${YIBAO_PART.PARTS_KEY_NAME[part_type.value]}`,
    }),
    confirm() {
      setGamePropNum(type === "COLOR" ? "JUMP_COIN" : "GUESS_COIN", price, "SUB");

      buyAlonePart();
      bigYiBaoBody.playChangePartAnimation();
      $message(MESSAGE_TIP.dl57);
    },
  });
};

watchEffect(() => {
  index.value = part_style_type.value === "COLOR" ? 0 : 1;
});

onMounted(() => {
  $tip({
    align: "right-bottom",
    color: false,
    text: SCENE_TIP.mu63,
    createFn() {
      $focus.show(kSelectRef.value!._el!);
    },
    btnFn() {
      $focus.close();
      setPartType("side");
      setPartStyle("IMG");
    },
  });
});
</script>

<template>
  <div class="part-list">
    <div class="title">
      <span class="label" :data-text="part_key_name[part_type]">
        {{ part_key_name[part_type] }}
      </span>
      <KSelect
        v-if="YIBAO_PART.PART_SUPPORT_IMG.includes(part_type)"
        ref="kSelectRef"
        v-model="index"
        width="7rem"
        :option="['配色', '贴图']"
        @update:model-value="onSetPartStyle"
      />
    </div>

    <ColorsTextures />

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

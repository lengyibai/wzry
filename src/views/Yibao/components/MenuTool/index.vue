<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";

import PartOrderDetail from "./components/PartOrderDetail/index.vue";

import { KButton } from "@/components/business";
import { YibaoStore } from "@/store";
import { $confirm, $message } from "@/utils/busTransfer";
import { MESSAGE_TIP, MOUSE_TIP } from "@/config";
import { vMouseTip } from "@/directives";
import { PARTS_KEY_NAME } from "@/config/modules/yibao-part";
import { usePlayAudio } from "@/hooks";

const $yibaoStore = YibaoStore();

const { pay_order, is_change_part, part_type } = storeToRefs($yibaoStore);
const { saveOwnedPart, resetCurrentPartStyle, resetAllPartStyle } = $yibaoStore;

const { playAudio } = usePlayAudio();

/** 是否显示订单详情 */
const show_order_detail = ref(false);

/** @description 提交订单 */
const handleCommitOrder = () => {
  show_order_detail.value = true;
};

/** @description 还原当前部件 */
const handleResetCurrent = () => {
  if (!is_change_part.value) return;
  resetCurrentPartStyle();
  playAudio("pj83");
};

/** @description 还原所有部件 */
const handleResetAllPart = () => {
  if (!is_change_part.value) return;
  resetAllPartStyle();
  playAudio("pj83");
};

onBeforeRouteLeave((to, from, next) => {
  if (pay_order.value.length) {
    handleCommitOrder();
    $message(MESSAGE_TIP.m21j, "error");
    next(false);
  } else if (pay_order.value.length === 0 && is_change_part.value) {
    $confirm({
      text: "你还未保存部件装扮，是否保存？",
      confirm() {
        saveOwnedPart();
        next();
      },
      cancel() {
        next();
      },
    });
  } else {
    next();
  }
});
</script>

<template>
  <div class="menu-tool">
    <KButton
      v-if="pay_order.length === 0 && is_change_part"
      v-mouse-tip
      class="k-button"
      @click="saveOwnedPart"
    >
      保存部件
    </KButton>
    <KButton v-if="pay_order.length" v-mouse-tip class="k-button" @click="handleCommitOrder">
      提交订单
    </KButton>
    <KButton
      v-mouse-tip="{
        text: is_change_part ? `只还原上次${PARTS_KEY_NAME[part_type]}部件样式` : '',
        disabled: !is_change_part,
      }"
      type="warning"
      class="k-button"
      :disabled="!is_change_part"
      @click="handleResetCurrent"
    >
      还原当前部件
    </KButton>
    <KButton
      v-mouse-tip="{
        text: is_change_part ? MOUSE_TIP.i73w : '',
        disabled: !is_change_part,
      }"
      type="error"
      class="k-button"
      :disabled="!is_change_part"
      @click="handleResetAllPart"
    >
      还原所有部件
    </KButton>
  </div>

  <PartOrderDetail v-if="show_order_detail" v-model="show_order_detail" />
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

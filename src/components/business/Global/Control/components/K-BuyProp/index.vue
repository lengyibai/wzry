<script setup lang="ts">
import { ref } from "vue";

import { useBuyProp } from "./hooks/useBuyProp";

import { KnapsackStore } from "@/store";
import { vDebounceClick, vMouseTip } from "@/directives";
import { $msgTipText, GAME_PROP } from "@/config";
import { KButton, KDialog, KRange } from "@/components/business";
import { $message, $obtain } from "@/utils/busTransfer";
import { _getPropLink } from "@/utils/concise";

const $knapsackStore = KnapsackStore();

const { show, config } = useBuyProp();

const dialogRef = ref<InstanceType<typeof KDialog>>();

/** 购买数量 */
const count = ref(1);

/** @description 确定 */
const handleConfirm = () => {
  if (!config.value || count.value < 1) return;

  const price = config.value.price * count.value;

  $knapsackStore
    .setGamePropNum(config.value.type, price, "SUB")
    .then(async () => {
      const key = config.value!.key;

      //发放奖励弹窗
      $obtain({
        name: GAME_PROP.NAME[key],
        key,
        icon: _getPropLink(GAME_PROP.ICON[key]),
        num: config.value!.num * count.value,
      });

      //在关闭弹窗后设置为0
      await dialogRef.value!._close();
      count.value = 1;
    })
    .catch(() => {
      $message($msgTipText("wa83", { v: GAME_PROP.NAME[config.value!.type] }), "error");
    });
};
</script>

<template>
  <teleport to="body">
    <KDialog
      v-if="show"
      ref="dialogRef"
      v-model="show"
      width="52rem"
      :ratio="0.6"
      z-index="var(--z-index-close-dialog)"
      up
      title="道具购买"
      @close="count = 1"
    >
      <div class="k-buy-prop">
        <div v-if="config" class="prop-data">
          <div class="prop-info">
            <div class="icon-box">
              <img :src="_getPropLink(GAME_PROP.ICON[config.key])" alt="" class="icon" />
            </div>

            <div class="base">
              <div class="name">{{ GAME_PROP.NAME[config.key] }}</div>
              <div class="price">
                <div class="text">数量</div>
                <div class="num">{{ config.num * count }}</div>
              </div>
            </div>
          </div>
          <div class="prop-desc">{{ GAME_PROP.DESC[config.key] }}</div>
        </div>
        <div class="range">
          <div class="desc">
            <span class="text">购买次数</span>
            <span class="num">{{ count }}</span>
          </div>
          <KRange v-model="count" :show-num="false" />
        </div>
        <KButton
          v-if="config"
          v-mouse-tip="{
            disabled: count < 1,
          }"
          v-debounce-click="handleConfirm"
          :disabled="count < 1"
          class="k-button"
          type="warning"
        >
          <img :src="_getPropLink(GAME_PROP.ICON[config.type])" alt="" class="icon" />
          <div class="price">{{ config.price * count }}</div>
        </KButton>
      </div>
    </KDialog>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

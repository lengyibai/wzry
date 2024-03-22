<script setup lang="ts">
import { ref } from "vue";

import { BuyProp } from "./interface";

import { AudioStore, KnapsackStore } from "@/store";
import { vMouseTip } from "@/directives";
import { $msgTipText, GAME_PROP } from "@/config";
import { KButton, KDialog, KRange } from "@/components/business";
import { useSetMarker } from "@/hooks";
import { $obtain, $message } from "@/utils/busTransfer";
import { $bus } from "@/utils/eventBus";

const $audioStore = AudioStore();
const $knapsackStore = KnapsackStore();

const $useSetMarker = useSetMarker();

const dialogRef = ref<InstanceType<typeof KDialog>>();

/** 是否显示 */
const show = ref(false);
/** 购买数量 */
const count = ref(1);
/** 接收的配置 */
const config = ref<BuyProp>({
  prop: GAME_PROP.HERO_EXP_TWO,
  price: 0,
  type: "GOLD",
  num: 0,
});

$bus.on("buy-prop", (v) => {
  show.value = true;
  config.value = v;
  $audioStore.play("e6b4");
});

/* 确定 */
const handleConfirm = () => {
  const price = config.value.price * count.value;

  $knapsackStore
    .setGamePropNum(config.value.type, price, "SUB")
    .then(async () => {
      $knapsackStore.setGamePropNum(config.value.prop.key, config.value.num * count.value, "ADD");
      $useSetMarker.add(config.value.prop.key, config.value.num * count.value, "SHOP");
      $obtain({
        icon: config.value.prop.icon,
        name: config.value.prop.label,
        num: config.value.num * count.value,
      });
      await dialogRef.value!._close();
      count.value = 1;
    })
    .catch(() => {
      $message($msgTipText("wa83", { v: GAME_PROP[config.value.type].label }), "error");
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
      :audio="false"
      up
      @close="count = 1"
    >
      <div class="k-buy-prop">
        <div v-if="config" class="prop-data">
          <div class="prop-info">
            <div class="icon-box">
              <img :src="config.prop.icon" alt="" class="icon" />
            </div>

            <div class="base">
              <div class="name">{{ config.prop.label }}</div>
              <div class="price">
                <div class="text">数量</div>
                <div class="num">{{ config.num * count }}</div>
              </div>
            </div>
          </div>
          <div class="prop-desc">{{ config.prop.desc }}</div>
        </div>
        <div class="range">
          <div class="desc">
            <span class="text">购买次数</span>
            <span class="num">{{ count }}</span>
          </div>
          <KRange v-model="count" :min="1" :show-num="false" />
        </div>
        <KButton v-mouse-tip class="k-button" type="warning" @click="handleConfirm">
          <img :src="GAME_PROP[config.type].icon" alt="" class="icon" />
          <div class="price">{{ config.price * count }}</div>
        </KButton>
      </div>
    </KDialog>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

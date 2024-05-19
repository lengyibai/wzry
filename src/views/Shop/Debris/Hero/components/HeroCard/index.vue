<script setup lang="ts">
import { vBlurLoad, vMaskGradient, vMouseTip, vSweepLight } from "@/directives";
import { GAME_PROP } from "@/config";
import { KButton } from "@/components/business";
import { _getPropLink } from "@/utils/concise";

interface Props {
  /** 英雄数据 */
  data: Game.Hero.Data;
}

defineProps<Props>();

const $emit = defineEmits<{
  exchange: [v: Game.Hero.Data];
}>();

/** @description 兑换
 * @param data 英雄数据
 */
const handleExchange = (data: Game.Hero.Data) => {
  $emit("exchange", data);
};
</script>

<template>
  <div
    v-mask-gradient="{
      color: '#000',
    }"
    v-sweep-light
    class="hero-card"
  >
    <!-- 编号 -->
    <span class="id">No.{{ data.id }}</span>

    <!-- 悬浮蒙版 -->
    <div class="select-mask">
      <KButton v-mouse-tip class="k-button" type="warning" @click="handleExchange(data)">
        点击兑换
      </KButton>
    </div>

    <!-- 背景图 -->
    <img
      v-blur-load="{
        img: data.cover,
      }"
      class="bg"
      :src="data.coverBlur"
    />

    <!-- 底部名字 -->
    <div class="bottom">
      <div class="name" v-html="data.name"></div>
      <div class="price">
        <img :src="_getPropLink(GAME_PROP.ICON['HERO_DEBRIS'])" alt="" class="icon" />
        <div class="count">{{ data.price }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

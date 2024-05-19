<script setup lang="ts">
import { vAnimateNumber, vBlurLoad, vMaskGradient, vMouseTip } from "@/directives";
import { $mouseTipText, MOUSE_TIP } from "@/config";
import { KnapsackStore } from "@/store";
import { useHaveHeroSkin } from "@/hooks";

interface Props {
  /** 皮肤数据 */
  data: Game.Hero.Skin;
}

const $props = defineProps<Props>();
const $emit = defineEmits<{
  view: [e: Event, id: number];
}>();

const $knapsackStore = KnapsackStore();

/** @description 根据价格是否为数字决定是否显示点券
 * @param price 价格
 */
const priceShow = (price: number | string) => {
  return price && !isNaN(Number(price));
};

/** @description 点击工具选项 */
const handleView = (e: Event) => {
  const id = $props.data.id;
  if (useHaveHeroSkin(id, "SKIN")) {
    $emit("view", e, id);
  }
};
</script>

<template>
  <div
    v-mask-gradient
    v-mouse-tip="{
      disabled: !$knapsackStore.skin_list.includes(data.id),
      text: $knapsackStore.skin_list.includes(data.id)
        ? MOUSE_TIP.mv02
        : $mouseTipText('a20t', { v: '皮肤' }),
    }"
    class="skin-card"
  >
    <!-- 背景图 -->
    <div
      class="bg-box"
      :class="{
        have: $knapsackStore.skin_list.includes(data.id),
      }"
    >
      <img
        v-blur-load="{
          img: data.cover,
        }"
        class="bg"
        :src="data.posterBlur"
      />
    </div>
    <img v-if="data.link" class="type" :src="data.link" />

    <!-- 价格 -->
    <div class="price">
      <div v-if="priceShow(data.price)" class="coupon"></div>
      <span
        v-animate-number="{
          num: data.price,
          duration: 2000,
        }"
      ></span>
    </div>

    <!-- 名字、代号 -->
    <div class="bottom">
      <div class="name" v-html="data.name"></div>
      <div class="mark" v-html="`——${data.heroName}`"></div>
    </div>

    <div class="tool">
      <span @click="handleView">
        <i class="iconfont wzry-fangda" />
        查看详情
      </span>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

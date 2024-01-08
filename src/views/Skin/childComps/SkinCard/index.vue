<script setup lang="ts">
import { vAnimateNumber, vMaskGradient, vMouseTip } from "@/directives";
import { KImageLoad } from "@/components/business";
import { MOUSE_TIP } from "@/config";

interface Props {
  /** 皮肤数据 */
  data: Game.Hero.Skin;
}

const $props = defineProps<Props>();
const $emit = defineEmits<{
  showTool: [e: Event, v: Game.Hero.Skin];
}>();

/* 根据价格是否为数字决定显示点券 */
const priceShow = (price: number | string) => {
  return price && !isNaN(Number(price));
};

/* 点击工具选项 */
const handleView = (e: Event) => {
  $emit("showTool", e, $props.data);
};
</script>

<template>
  <div
    v-maskGradient
    v-mouse-tip="{
      text: MOUSE_TIP.mv02,
    }"
    class="skin-card"
  >
    <KImageLoad loading-width="20%" :big-img="data.cover" :blur-img="data.posterBlur" class="bg" />
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
      <div class="name" v-html="data.skin_name"></div>
      <div class="mark" v-html="`——${data.hero_name}`"></div>
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

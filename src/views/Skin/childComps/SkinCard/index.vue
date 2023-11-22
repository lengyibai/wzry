<script setup lang="ts">
import { $concise } from "@/utils";
import { vAnimateNumber, vBlurLoad, vMaskGradient } from "@/directives";

interface Props {
  /** 皮肤数据 */
  data: Hero.Skin;
}

const $props = defineProps<Props>();
const $emit = defineEmits<{
  showTool: [e: Event, v: { type: string; data: Hero.Skin }];
}>();

const { getImgLink } = $concise;

/* 根据价格是否为数字决定显示点券 */
const priceShow = (price: number | string) => {
  return price && !isNaN(Number(price));
};

/* 点击工具选项 */
const handle = (e: Event, v: string) => {
  $emit("showTool", e, { type: v, data: $props.data });
};
</script>

<template>
  <div v-maskGradient class="skin-card">
    <img v-blurLoad="data.cover" class="bg blur" :src="data.posterBlur" />
    <img v-if="data.type" class="type" :src="data.type.toString()" />

    <!-- 价格 -->
    <div class="price">
      <img v-if="priceShow(data.price)" :src="getImgLink('coupon')" alt="" />
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
      <div class="mark" v-html="'——' + data.hero_name"></div>
    </div>

    <!-- 悬浮工具 -->
    <div class="tool">
      <span class="global_cursor-pointer" @click="handle($event, 'poster')">
        <i class="iconfont wzry-fangda" />大图
      </span>
      <span class="global_cursor-pointer" @click="handle($event, 'voice')">
        <i class="iconfont wzry-bofangyuyin" />语音
      </span>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

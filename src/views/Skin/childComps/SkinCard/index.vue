<script setup lang="ts">
interface Props {
  data: Hero.Skin; //皮肤数据
}
const props = defineProps<Props>();

interface Emits {
  (e: "showTool", v: { type: string; data: Hero.Skin }): void;
}
const emit = defineEmits<Emits>();

const IMGBED = window.IMGBED; //全局图床链接

/* 根据价格是否为数字决定显示点券 */
const priceShow = (price: number | string) => {
  return price && !isNaN(Number(price));
};

/* 点击工具选项 */
const handle = (v: string) => {
  emit("showTool", { type: v, data: props.data });
};
</script>

<template>
  <div v-maskGradient class="skin-card">
    <img class="bg" :src="data.cover" loading="lazy" />
    <img v-if="data.type" class="type" :src="(data.type as string)" />

    <!-- 价格 -->
    <div class="price">
      <img v-if="priceShow(data.price)" :src="IMGBED + '/image/coupon.png'" alt="" />
      <span>{{ data.price }}</span>
    </div>

    <!-- 名字、代号 -->
    <div class="bottom">
      <div class="name">{{ data.name }}</div>
      <div class="mark">——{{ data.heroName }}</div>
    </div>

    <!-- 悬浮工具 -->
    <div class="tool">
      <span @click="handle('poster')"> <i class="iconfont wzry-fangda cursor-pointer" />大图</span>
      <span @click="handle('voice')">
        <i class="iconfont wzry-bofangyuyin cursor-pointer" />语音</span
      >
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

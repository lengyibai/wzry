<script setup lang="ts">
import { skinDefault } from "@/defaultValue";

interface Props {
  data: typeof skinDefault; //英雄数据
}
withDefaults(defineProps<Props>(), {
  data: () => skinDefault,
});

interface Emits {
  (e: "showTool", v: string): void;
}
const emit = defineEmits<Emits>();

const IMGBED = window.IMGBED; //全局图床链接

/* 根据价格是否为数字决定显示点券 */
const priceShow = (price: number | string) => {
  return price && !isNaN(Number(price));
};

/* 点击工具选项 */
const handle = (v: string) => {
  emit("showTool", v);
};
</script>

<template>
  <div v-maskGradient class="skin-card cursor-pointer">
    <img class="bg" :src="data.cover" />
    <img v-if="data.type" class="type" :src="(data.type as string)" />
    <div class="price">
      <img
        v-if="priceShow(data.price)"
        :src="IMGBED + '/image/coupon.png'"
        alt=""
      />
      <span>{{ data.price }}</span>
    </div>
    <div class="bottom">
      <div class="name">{{ data.name }}</div>
      <div class="mark">——{{ data.heroName }}</div>
    </div>

    <!-- 悬浮工具 -->
    <div class="tool">
      <span @click="handle('poster')">
        <i class="iconfont wzry-fangda cursor-pointer" />大图</span
      >
      <span @click="handle('voice')">
        <i class="iconfont wzry-bofangyuyin cursor-pointer" />语音</span
      >
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

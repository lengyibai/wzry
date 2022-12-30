<script setup lang="ts">
import { ref } from "vue";
import { skinDefault } from "@/defaultValue/defaults";

interface Props {
  data: typeof skinDefault; //英雄数据
}
withDefaults(defineProps<Props>(), {
  data: () => skinDefault,
});

const show = ref(false); //显示查看详情选项

const priceShow = (price: number | string) => {
  return price && !isNaN(Number(price));
};
</script>

<template>
  <div class="skin-card cursor-pointer" :class="{ hide: show }" v-maskGradient>
    <img class="bg" :src="data.cover" />
    <img class="type" v-if="data.type" :src="(data.type as string)" />
    <div class="price">
      <img v-if="priceShow(data.price)" src="https://lengyibai.gitee.io/wzry-material/image/coupon.png" alt="" />
      <span>{{ data.price }}</span>
    </div>
    <div class="bottom">
      <div class="name">{{ data.name }}</div>
      <div class="mark">——{{ data.heroName }}</div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

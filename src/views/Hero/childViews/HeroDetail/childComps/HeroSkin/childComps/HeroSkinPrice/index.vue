<template>
  <div class="hero-skin-price">
    <img v-show="show" src="https://lengyibai.gitee.io/wzry-material/image/coupon.png" alt="点券" />
    <span v-show="!show && show !== ''">获取途径：</span>
    <span>{{ price }}</span>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";

interface Props {
  price: number | string;
}
const props = withDefaults(defineProps<Props>(), {
  price: "",
});

const show = computed(() => {
  return props.price && !isNaN(Number(props.price));
});
</script>
<style scoped lang="less">
@import url("./index.less");
</style>

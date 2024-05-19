<script setup lang="ts">
import { ref } from "vue";

const show = ref(true);

const fn = () => {
  show.value = window.innerWidth * 0.75 < window.innerHeight;
};
fn();
window.addEventListener("resize", fn);
</script>

<template>
  <teleport to="body">
    <div v-if="show" class="k-phone" @dblclick="show = false">
      暂未完全适配短屏及竖屏<br />敬请期待！
    </div>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

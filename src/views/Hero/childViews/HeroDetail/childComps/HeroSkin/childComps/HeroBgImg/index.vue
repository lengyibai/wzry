<script setup lang="ts">
interface Props {
  bgImg: string[];
  toggle: boolean;
}

withDefaults(defineProps<Props>(), {
  bgImg: () => [],
  toggle: false,
});
</script>

<template>
  <div class="hero-bg-img">
    <transition-group name="clip">
      <img
        class="bg"
        v-if="bgImg[0]"
        :src="bgImg[0]"
        alt=""
        v-show="toggle"
        key="a"
      />
      <img class="bg" :src="bgImg[1]" alt="" v-show="!toggle" key="b" />
    </transition-group>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

<script setup lang="ts">
interface Props {
  skinTypeImg: string; //皮肤类型图
  toggle: boolean; //用于皮肤类型切换动画
}
withDefaults(defineProps<Props>(), {
  skinTypeImg: "",
});
</script>

<template>
  <div class="hero-skin-type">
    <transition-group name="updown">
      <img v-if="skinTypeImg && toggle" :src="skinTypeImg" alt="" @dragstart.prevent key="a" />
      <img v-if="skinTypeImg && !toggle" :src="skinTypeImg" alt="" @dragstart.prevent key="b" />
    </transition-group>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

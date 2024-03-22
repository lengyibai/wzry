<script setup lang="ts">
interface Props {
  /** 皮肤类型图 */
  skinTypeImg: string;
  /** 用于皮肤类型切换动画 */
  toggle: boolean;
}

withDefaults(defineProps<Props>(), {
  skinTypeImg: "",
});
</script>

<template>
  <div class="hero-skin-type">
    <transition-group name="up-down">
      <img v-if="skinTypeImg && toggle" key="a" :src="skinTypeImg" alt="" />
      <img v-if="skinTypeImg && !toggle" key="b" :src="skinTypeImg" alt="" />
    </transition-group>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

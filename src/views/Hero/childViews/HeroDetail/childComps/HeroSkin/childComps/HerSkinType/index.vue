<template>
  <div class="hero-skin-type">
    <transition-group name="updown">
      <img
        v-if="skinTypeImg && toggle"
        key="a"
        :src="skinTypeImg"
        alt=""
        @dragstart.prevent
      />
      <img
        v-if="skinTypeImg && !toggle"
        key="b"
        :src="skinTypeImg"
        alt=""
        @dragstart.prevent
      />
    </transition-group>
  </div>
</template>
<script setup lang="ts">
interface Props {
  skinTypeImg: string | string; //皮肤类型图
  toggle: boolean; //用于皮肤类型切换动画
}

withDefaults(defineProps<Props>(), {
  skinTypeImg: "",
  toggle: false,
});
</script>
<style scoped lang="less">
@import url("./index.less");
</style>

<script setup lang="ts">
import { ref, computed } from "vue";

interface Emits {
  (e: "clicks", v: string): void;
}
const emit = defineEmits<Emits>();

const muted = ref(false);

const icon = computed(() => {
  return muted.value ? "wzry-jingyin" : "wzry-laba";
});

/* 点击某个按钮 */
const handleShowNotice = (v: string) => {
  emit("clicks", v);
  if (v === "sound") {
    muted.value = !muted.value;
  }
};
</script>

<template>
  <div class="tool-bar">
    <div class="line"></div>
    <div
      class="box cursor-pointer"
      @click="handleShowNotice('sound')"
      :style="{ opacity: muted ? 0.75 : 1 }"
    >
      <i class="iconfont" :class="icon"></i>
    </div>
    <div class="line"></div>
    <div class="box cursor-pointer" @click="handleShowNotice('notice')">
      <i class="iconfont wzry-gonggao"></i>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

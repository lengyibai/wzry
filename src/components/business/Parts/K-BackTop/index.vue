<script setup lang="ts">
import { ref } from "vue";

interface Props {
  active: boolean;
}

defineProps<Props>();
const $emit = defineEmits<{
  "back-top": [];
}>();

const backTopRef = ref<HTMLElement>();

/* 返回顶部 */
const handleBackTop = () => {
  $emit("back-top");
};
</script>

<template>
  <teleport to="body">
    <div
      ref="backTopRef"
      class="k-backtop"
      :class="{
        active: active,
      }"
    >
      <div class="line"></div>
      <i class="iconfont wzry-spider" @click="handleBackTop" />
    </div>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

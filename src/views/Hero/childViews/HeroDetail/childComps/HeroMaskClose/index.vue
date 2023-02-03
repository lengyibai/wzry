<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";

import $bus from "@/utils/eventBus";

interface Emits {
  (e: "close"): void;
}
const emit = defineEmits<Emits>();

const show = ref(false);

/* 关闭 */
const close = () => {
  emit("close");
};

$bus.on("mousemove", (event) => {
  const e = event as MouseEvent;
  show.value = e.clientY <= 100;
});

onBeforeUnmount(() => {
  $bus.off("mousemove");
});
</script>

<template>
  <transition name="mask-close">
    <div v-show="show" class="mask-close">
      <transition name="mask-move">
        <i v-show="show" class="iconfont wzry-guanbi cursor-pointer" @click="close"> </i>
      </transition>
    </div>
  </transition>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

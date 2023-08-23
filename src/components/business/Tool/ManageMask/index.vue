<script setup lang="ts">
import { ref, StyleValue } from "vue";

interface Props {
  show: boolean; //显示/隐藏
  styles?: StyleValue; //样式
}
defineProps<Props>();

const content = ref();

defineExpose({
  el: content,
});
</script>

<template>
  <transition name="fade">
    <div class="manage-mask">
      <transition name="fade">
        <div v-if="show" ref="content" class="content" :style="styles">
          <slot></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

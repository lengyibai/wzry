<script setup lang="ts">
import { ref, StyleValue } from "vue";

interface Props {
  /** 是否显示 */
  show: boolean;
  /** 样式 */
  styles?: StyleValue;
}

defineProps<Props>();

const contentRef = ref();

defineExpose({
  el: contentRef,
});
</script>

<template>
  <transition name="fade">
    <div class="manage-mask">
      <transition name="fade">
        <div v-if="show" ref="contentRef" class="content" :style="styles">
          <slot></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

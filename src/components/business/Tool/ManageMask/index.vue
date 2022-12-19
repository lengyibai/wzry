<template>
  <transition name="fade">
    <div class="manage-mask">
      <transition name="fade">
        <div class="content" ref="content" v-if="show" :style="styles">
          <slot></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { ref, StyleValue } from "vue";

interface Props {
  show: boolean;
  styles?: StyleValue;
}
withDefaults(defineProps<Props>(), {
  show: false,
});
const content = ref();

defineExpose({
  el: content,
});
</script>
<style scoped lang="less">
@import url("./index.less");
</style>

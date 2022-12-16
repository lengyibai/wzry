<template>
  <transition name="fade">
    <div class="manage-mask">
      <transition name="fade">
        <div class="content" v-if="show" :style="styles">
          <slot></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { CSSProperties } from "vue";

interface Props {
  show: boolean;
  styles?: CSSProperties;
}
withDefaults(defineProps<Props>(), {
  show: false,
});
</script>
<style scoped lang="less">
@import url("./index.less");
</style>

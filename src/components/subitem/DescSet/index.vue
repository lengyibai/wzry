<script setup lang="ts">
import { ref } from "vue";

interface Props {
  /** 描述 */
  desc: string;
}

defineProps<Props>();

/** 显示tip */
const show_desc = ref(false);
</script>

<template>
  <div class="desc-set">
    <transition name="desc-set">
      <div
        v-show="show_desc"
        class="desc-tip"
        @mouseenter="show_desc = true"
        @mouseleave="show_desc = false"
      >
        {{ desc }}
      </div>
    </transition>
    <div
      class="question-icon"
      @mouseenter="show_desc = true"
      @mouseleave="show_desc = false"
    >
      <span>?</span>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

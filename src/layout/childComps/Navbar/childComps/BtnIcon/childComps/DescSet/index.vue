<script setup lang="ts">
import { ref } from "vue";

interface Props {
  desc: string;
}
withDefaults(defineProps<Props>(), {
  desc: "",
});

const show_desc = ref(false); // 显示tip
</script>

<template>
  <div class="desc-set">
    <transition name="desc-set">
      <div
        class="desc-tip"
        v-show="show_desc"
        @mouseenter="show_desc = true"
        @mouseleave="show_desc = false"
      >
        {{ desc }}
      </div>
    </transition>
    <div
      class="question-icon cursor-pointer"
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

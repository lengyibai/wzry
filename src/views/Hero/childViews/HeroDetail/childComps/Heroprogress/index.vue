<script setup lang="ts">
import switchStore from "@/store/switch";
interface Props {
  index: number;
  pageName: string[];
}
withDefaults(defineProps<Props>(), {
  index: 0,
  pageName: () => [],
});

interface Emits {
  (e: "toggle", v: number): void;
}
const emit = defineEmits<Emits>();

const $switchStore = switchStore();

/* 设置进度 */
const handleToggle = (index: number) => {
  emit("toggle", index);
  $switchStore.$clickAudio("tab");
};
</script>

<template>
  <!-- 滚动进度 -->
  <div class="hero-progress">
    <div
      v-for="(item, i) in pageName"
      :key="i"
      class="page-index"
      :class="{ active: index === i + 1 }"
    >
      <div
        v-show="index !== i + 1"
        class="tab flex"
        @click="handleToggle(i + 1)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

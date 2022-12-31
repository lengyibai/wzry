<script setup lang="ts">
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

/* 设置进度 */
const handleToggle = (index: number) => {
  emit("toggle", index);
};
</script>

<template>
  <!-- 滚动进度 -->
  <div class="hero-progress">
    <div
      class="page-index"
      v-for="(item, i) in pageName"
      :key="i"
      :class="{ active: index === i + 1 }"
    >
      <div
        class="tab flex"
        @click="handleToggle(i + 1)"
        v-show="index !== i + 1"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

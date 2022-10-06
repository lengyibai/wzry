<template>
  <!--
    v-particle="{
      color: particle_color[type],
      size: 5,
      brightness: 1.25,
      contrast: 1.1,
    }" -->
  <div
    class="K-Button cursor-pointer"
    :style="{
      width: autoSize ? '100%' : width,
      height: autoSize ? '100%' : height,
    }"
  >
    <span
      class="cursor-pointer flex"
      :style="{
        fontSize,
      }"
    >
      <slot>按钮</slot>
    </span>
    <img class="cursor-pointer" :src="getIcon(type)" />
  </div>
</template>
<script setup>
import { toRefs } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'info',
  },
  width: {
    type: String,
    default: '224px',
  },
  height: {
    type: String,
    default: '56px',
  },
  fontSize: {
    type: String,
    default: '24px',
  },
  autoSize: {
    type: Boolean,
    default: false,
  },
});
const { type } = toRefs(props);

const particle_color = {
  info: '#3f9ed3',
  error: '#d83e41',
  warning: '#e1c673',
};

const getIcon = (src) => new URL(`./img/${src}.png`, import.meta.url).href;
</script>
<style scoped lang="less">
@import './index.less';
</style>

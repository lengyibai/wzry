<template>
  <div class="SelectImg flex cursor-pointer" :class="type" @click="set(keyword)">
    <img class="cursor-pointer" :src="src" alt="" v-show="src" />
    <LibSvg
      class="add cursor-pointer"
      :svg="icon.ADD"
      v-show="!src"
      color="var(--theme-color-eight)"
      enter-color="var(--theme-color-four)"
      size="75px"
    />
  </div>
</template>
<script setup>
import icon from '@/assets/icon/svg/icon.js';

defineProps({
  /* 图片路径 */
  src: {
    type: String,
    default: '',
  },
  /* 键值 */
  keyword: {
    type: String,
    default: '',
  },
  /* 图片比例 */
  type: {
    type: String,
    default: 'square',
    validator: (value) => {
      return ['width', 'height', 'square'].indexOf(value) !== -1;
    },
  },
});

const emit = defineEmits(['select']);
const set = (key) => {
  emit('select', key);
};
</script>
<style scoped lang="less">
@import './index.less';
</style>

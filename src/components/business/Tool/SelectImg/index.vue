<template>
  <div class="SelectImg flex cursor-pointer" :class="[type, { border: !src }]" @click="set(keyword)">
    <img class="cursor-pointer" :src="src" alt="" v-show="src" />
    <LibSvg
      class="add cursor-pointer"
      :svg="icon.ADD"
      v-show="!src"
      color="var(--theme-color-eight)"
      size="50px"
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
.SelectImg {
  position: relative;
  width: 150px;
  height: 150px;
  background-color: transparent;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}
.border {
  border: 3px solid #fff;
  border-image: linear-gradient(315deg, #3774b4 0%, #73b1d5 100%) 1 1 !important;
  &:hover {
    border-image: linear-gradient(315deg, #5989a5 0%, #295686 100%) 1 1 !important;
  }
  &:hover {
    border-style: dashed;
  }
  &:active {
    transform: scale(0.95);
  }
}

.width {
  width: 200px !important;
  height: 100px !important;
}
.height {
  width: 100px !important;
  height: 200px !important;
}
.square {
  width: 100px !important;
  height: 100px !important;
}
</style>

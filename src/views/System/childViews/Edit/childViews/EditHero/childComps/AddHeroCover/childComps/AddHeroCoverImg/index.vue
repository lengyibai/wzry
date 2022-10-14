<template>
  <div class="AddHeroCoverImg flex cursor-pointer" @click="setKeyValue('cover')">
    <LibSvg
      :svg="icon.ADD"
      color="var(--theme-color-eight)"
      enter-color="var(--theme-color-four)"
      size="75px"
      v-show="!hero_data.cover"
    />
    <img
      class="cover-img"
      v-if="hero_data.cover"
      :src="hero_data.cover"
      :style="{
        top: p.top + '%',
        left: p.left + '%',
        transform: p.transform,
      }"
    />
  </div>
</template>
<script setup>
import { inject } from 'vue';
import icon from '@/assets/icon/svg/icon';

defineProps({
  /* 偏移量及缩放量 */
  p: {
    type: Object,
    default() {
      return {};
    },
  },
});

const hero_data = inject('hero_data', {});
const setKeyValue = inject('setKeyValue', '');
</script>
<style scoped lang="less">
.AddHeroCoverImg {
  position: relative;
  overflow: hidden;
  width: 200px;
  height: 300px;
  border: 5px solid var(--theme-color-eight);
  border-image: linear-gradient(315deg, #3774b4 0%, #73b1d5 100%) 1 1 !important;
  transition: all 0.25s;
  &:hover {
    border-image: linear-gradient(315deg, #5989a5 0%, #295686 100%) 1 1 !important;
  }
  &:active {
    transform: scale(0.95);
  }
  .cover-img {
    position: absolute;
    min-width: 100%;
    max-height: 100%;
    pointer-events: none;
  }
}
</style>

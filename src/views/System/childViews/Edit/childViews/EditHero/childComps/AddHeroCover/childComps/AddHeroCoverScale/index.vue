<template>
  <div class="AddHeroCoverOffset flex">
    <LibSvg
      :class="item.toLowerCase()"
      :key="index"
      :svg="icon[item]"
      @click="scale(item.toLowerCase())"
      style="position: absolute"
      color="var(--theme-color-eight)"
      enterColor="var(--theme-color-four)"
      size="75px"
      v-for="(item, index) in ['LEFT', 'RIGHT']"
    />
  </div>
</template>
<script setup>
import icon from './svg/index.js';

const emit = defineEmits(['scale']);
const scale = (scale) => {
  emit('scale', scale);
};
</script>
<style scoped lang="less">
.AddHeroCoverOffset {
  position: relative;
  width: 200px;
  height: 300px;
  .left {
    left: 0;
  }
  .right {
    right: 0;
  }
}
</style>

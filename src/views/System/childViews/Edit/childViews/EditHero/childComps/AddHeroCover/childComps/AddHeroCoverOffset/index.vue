<template>
  <div class="AddHeroCoverOffset flex">
    <LibSvg
      :class="item.toLowerCase()"
      :key="item"
      :svg="icon[item]"
      @mousedown="down(item.toLowerCase())"
      @mouseup="up(item.toLowerCase())"
      style="position: absolute"
      color="var(--theme-color-eight)"
      enterColor="var(--theme-color-four)"
      size="75px"
      v-for="item in ['TOP', 'RIGHT', 'BOTTOM', 'LEFT']"
    />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import icon from './svg/index.js';
import $bus from '@/utils/eventBus.js';

const timer = ref(null);
const direction = ref(''); //点击的方向

$bus.on('mouseup', () => {
  clearInterval(timer);
});

/* 长按自增 */
const emit = defineEmits(['direction']);
const down = (d) => {
  direction.value = d;
  timer.value = setInterval(() => {
    emit('direction', d);
  }, 100);
};

/* 抬起中断自增并增 */
const up = (d) => {
  clearInterval(timer.value);
  emit('direction', d);
};
</script>
<style scoped lang="less">
.AddHeroCoverOffset {
  position: relative;
  width: 250px;
  height: 250px;
  .top {
    top: 0;
  }
  .bottom {
    bottom: 0;
  }
  .left {
    left: 0;
  }
  .right {
    right: 0;
  }
}
</style>

<template>
  <div class="PassTime">{{ time }}</div>
</template>
<script setup>
import { ref } from 'vue';
//#####··········公共方法··········#####//
//方法信息：{ 记录已过去时间或倒计时，requestAnimationFrame计时器 }
import { $getCountTime, $frameInterval } from '@/utils/index.js';

const time = ref('');

$frameInterval(() => {
  const {
    y, mon, d, h, min, s,
  } = $getCountTime('2022-3-17');
  const year = y !== '00' ? `${y}y` : '';
  const month = mon !== '00' ? `${mon}mon` : '';
  time.value = `${year} ${month} ${d}d ${h}h ${min}min ${s}s`;
}, 1000);

</script>
<style scoped lang="less">
.PassTime {
  color: var(--theme-color-five);
  font-size: 20px;
}
</style>

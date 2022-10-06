<template>
  <div class="Time">2022.3.16 - {{ time }}</div>
</template>
<script setup>
import { computed } from 'vue';
//#####··········公共方法··········#####//
//方法信息：{ 时间格式化 }
import { $fmtTime } from '@/utils/index.js';

const time = computed(() => $fmtTime(new Date(), 'YYYY.MM.DD'));
</script>
<style scoped lang="less">
.Time {
  color: var(--theme-color-five);
  font-size: 20px;
}
</style>

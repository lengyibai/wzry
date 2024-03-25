<script setup lang="ts">
interface Props {
  index: number;
}
defineProps<Props>();
</script>

<template>
  <div class="task-card">
    <div class="left">
      <div
        class="icon"
        :style="{
          backgroundImage: `url(/img/${index}.png)`,
        }"
      ></div>
      <div class="info">
        <div class="title">英雄夺宝</div>
        <div class="desc">完成25次英雄夺宝</div>
      </div>
    </div>
    <div class="right">
      <div class="props"></div>
      <div class="btn-box">
        <div class="schedule">
          <span>今日英雄夺宝次数：</span>
          <span class="index">0</span>
          <span>/25</span>
        </div>
        <div class="btn">前往</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

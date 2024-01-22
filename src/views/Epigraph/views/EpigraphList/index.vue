<script setup lang="ts">
import EpigraphToolbar from "./components/EpigraphToolbar/index.vue";
import EpigraphCategory from "./components/EpigraphCategory/index.vue";
import EpigraphList from "./components/EpigraphList/index.vue";
</script>

<template>
  <!-- 铭文类型分类 -->
  <transition name="epigraph" appear>
    <div class="tool">
      <EpigraphToolbar />
      <EpigraphCategory />
    </div>
  </transition>

  <!-- 铭文列表 -->
  <div class="epigraph-main">
    <EpigraphList />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

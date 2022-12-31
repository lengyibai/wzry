<script setup lang="ts">
import { epigraphDefault } from "@/defaultValue/defaults";

interface Props {
  data: typeof epigraphDefault;
}

withDefaults(defineProps<Props>(), {
  data: () => epigraphDefault,
});
</script>

<template>
  <div
    class="epigraph-card flex"
    v-maskGradient="{ color: 'rgb(45, 90, 142)', num1: '-35%', num2: '35%' }"
  >
    <img :src="data.img" alt="" />
    <div class="box">
      <div class="name">5级铭文:{{ data.name }}</div>
      <div class="attr">
        <div class="type" v-for="(item, index) in data.effect" :key="index">
          {{ item.type }}+{{ item.num }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

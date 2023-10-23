<script setup lang="ts">
import useLoading from "./hooks/useLoading";

import { CONFIG } from "@/config";
import { $bus } from "@/utils";

const { show, text } = useLoading();

const color = ["#ffff00", "#76ff03", "#f06292", "#4fc3f7", "#ba68c8", "#f57c00", "#673ab7"];

$bus.on("loading", (v) => {
  show.value = v.show;
  text.value = v.text;
});
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div v-show="show" class="k-loading global_flex-center">
        <img :src="CONFIG.BASE.IMGBED + '/image/daji.png'" alt="妲己" @dragstart.prevent />
        <span
          v-for="(item, index) in color"
          :key="index"
          :style="{
            backgroundColor: item,
            animationDelay: index * 0.1 - 0.8 + 0.5 + 's',
            boxShadow: '0 0 50px ' + item,
          }"
        ></span>
        <h1>正在加载{{ text }}页面...</h1>
      </div>
    </transition>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

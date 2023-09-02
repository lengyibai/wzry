<script setup lang="ts">
import { ref } from "vue";

import { API_DATA } from "@/api";
import { AudioStore } from "@/store";
import { $tool } from "@/utils";

const $audioStore = AudioStore();

/** 当前显示的图片的索引号 */
const active = ref(-1);
const imgs = ref<string[]>([]);

$audioStore.play("u4c5");

API_DATA.Team().then((res) => {
  imgs.value = res.data as unknown as string[];
});

/* 查看图片 */
const handleView = (v: string, i: number) => {
  new $tool.ScaleImage(v);
  active.value = i;
};
</script>

<template>
  <K-Dialog v-bind="$attrs" width="56.25rem" header="辅助求带飞">
    <div class="team">
      <img
        v-for="(item, index) in imgs"
        :key="index"
        class="cursor-pointer"
        :class="{
          active: index === active,
        }"
        :src="item"
        alt=""
        @click="handleView(item, index)"
      />
    </div>
  </K-Dialog>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

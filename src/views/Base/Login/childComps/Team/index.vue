<script setup lang="ts">
import { nextTick, ref } from "vue";

import { API_DATA } from "@/api";
import { AudioStore } from "@/store";
import { $tool } from "@/utils";
import { KDialog } from "@/components/business";

const $audioStore = AudioStore();

const teamRef = ref<HTMLElement>();

const imgs = ref<string[][]>([]);

$audioStore.play("u4c5");

API_DATA.Team().then(async (res) => {
  imgs.value = res.data;
  await nextTick();
  teamRef.value && new $tool.ImageLoader(teamRef.value);
});

/* 查看图片 */
const handleView = (e: Event, v: string[]) => {
  new $tool.ScaleFLIPImage(e, v[0], v[1]);
};
</script>

<template>
  <KDialog v-bind="$attrs" width="56.25rem" header="本站开发者战绩">
    <div ref="teamRef" class="team">
      <img
        v-for="(item, index) in imgs"
        :key="index"
        class="blur"
        :src="item[1]"
        :data-src="item[0]"
        alt=""
        @click="handleView($event, item)"
      />
    </div>
  </KDialog>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

<script setup lang="ts">
import { ref } from "vue";

import { API_DATA } from "@/api";
import { $concise, $imageView } from "@/utils";
import { KDialog } from "@/components/business";
import { vBlurLoad } from "@/directives";

const teamRef = ref<HTMLElement>();

const imgs = ref<string[][]>([]);

API_DATA.Team().then((res) => {
  imgs.value = res.data;
});

/* 查看图片 */
const handleView = (e: Event, v: string[]) => {
  $imageView({
    event: e,
    type: "DEFAULT",
    bigImage: v[0],
    blurImage: v[1],
    heroName: "冷弋白",
    heroAvatar: $concise.getImgLink("lyb"),
    skinName: "王者战绩",
  });
};
</script>

<template>
  <KDialog v-bind="$attrs" width="56.25rem" header="本站开发者战绩">
    <div ref="teamRef" class="team">
      <img
        v-for="(item, index) in imgs"
        :key="index"
        v-blurLoad="item[0]"
        :src="item[1]"
        alt=""
        @click="handleView($event, item)"
      />
    </div>
  </KDialog>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

<script setup lang="ts">
import { ref } from "vue";

import { API_DATA } from "@/api";
import { $imageView } from "@/utils";
import { KDialog } from "@/components/business";
import { vBlurLoad, vMouseTip } from "@/directives";
import { MOUSE_TIP } from "@/config";

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
  });
};
</script>

<template>
  <KDialog v-bind="$attrs" width="56.25rem" header="本站开发者战绩">
    <div ref="teamRef" class="team">
      <img
        v-for="(item, index) in imgs"
        :key="index"
        v-blur-load="item[0]"
        v-mouse-tip="{
          text: MOUSE_TIP.zq77,
        }"
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

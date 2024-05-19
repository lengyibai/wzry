<script setup lang="ts">
import { ref } from "vue";

import { API_DATA } from "@/api";
import { KDialog } from "@/components/business";
import { vBlurLoad, vMouseTip } from "@/directives";
import { $msgTipText, BASE_CONFIG, MOUSE_TIP } from "@/config";
import { $imageView, $message } from "@/utils/busTransfer";
import { _retryRequest } from "@/utils/tool";

const teamRef = ref<HTMLElement>();

const loading = ref(true);
const imgs = ref<string[][]>([]);

_retryRequest({
  promiseFn: API_DATA.Team,
})
  .then((res) => {
    loading.value = false;
    imgs.value = res.data.map((item) => item.map((item) => BASE_CONFIG.IMGBED + item));
  })
  .catch(() => {
    $message($msgTipText("rc53", { v: "系统公告" }), "error");
  })
  .finally(() => {
    loading.value = false;
  });

/** @description 查看图片
 * @param e 事件对象
 * @param v 图片数组
 */
const handleView = (e: Event, v: string[]) => {
  $imageView({
    parent: e.target as HTMLElement,
    type: "DEFAULT",
    bigImage: v[0],
    blurImage: v[1],
  });
};
</script>

<template>
  <KDialog :loading="loading" v-bind="$attrs" width="56.25rem" header="本站开发者战绩">
    <div ref="teamRef" class="team">
      <img
        v-for="(item, index) in imgs"
        :key="index"
        v-blur-load="{
          img: item[0],
        }"
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

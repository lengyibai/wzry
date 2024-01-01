<script setup lang="ts">
import { ref } from "vue";

import { vBlurLoad } from "./helper/blurLoad";

import { getImgLink } from "@/utils/modules/concise";

interface Props {
  /** 模糊图链接 */
  blurImg: string;
  /** 大图片链接 */
  bigImg: string;
  /** 是否支持点击查看大图 */
  click?: boolean;
  /** loading宽度百分比 */
  loadingWidth: string;
}
defineProps<Props>();

/** 图片加载状态 */
const status = ref<"loading" | "finish" | "error">("loading");

/* 加载成功 */
const onImageLoad = () => {
  status.value = "finish";
};

/* 加载失败 */
const onImageError = () => {
  status.value = "error";
};
</script>

<template>
  <div class="k-image-load">
    <img
      v-blurLoad="{
        link: bigImg,
        finish: onImageLoad,
        error: onImageError,
      }"
      :src="blurImg"
      alt=""
      class="image"
    />

    <transition name="fade" appear>
      <div
        v-if="status === 'loading'"
        class="loading"
        :style="{
          width: loadingWidth,
        }"
      >
        <img :src="getImgLink('logo_inside')" alt="" class="inside" @dragstart.prevent />
        <img :src="getImgLink('logo_outside')" alt="" class="outside" @dragstart.prevent />
      </div>
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

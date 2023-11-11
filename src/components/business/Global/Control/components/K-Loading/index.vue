<script setup lang="ts">
import { ref } from "vue";

import { $bus, $concise } from "@/utils";

const { getImgLink } = $concise;

/** 显示loading */
const show = ref(false);
/** loading描述 */
const text = ref("");

$bus.on("loading", (v) => {
  show.value = v.show;

  if (v.text) {
    text.value = v.text;
  }
});
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div v-show="show" class="k-loading">
        <div class="logo">
          <div class="inside">
            <img :src="getImgLink('into_1')" alt="" class="a" />
            <img :src="getImgLink('into_2')" alt="" class="b" />
          </div>

          <div class="outside">
            <img :src="getImgLink('into_3')" alt="" class="c" />
            <img :src="getImgLink('into_4')" alt="" class="d" />
          </div>
        </div>
        <div class="text">正在加载{{ text }}页面</div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

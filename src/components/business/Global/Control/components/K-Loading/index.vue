<script setup lang="ts">
import { ref } from "vue";

import { $bus } from "@/utils";
import { getImgLink } from "@/utils/modules/concise";

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
          <img :src="getImgLink('logo_inside')" alt="" class="inside" @dragstart.prevent />
          <img :src="getImgLink('logo_outside')" alt="" class="outside" @dragstart.prevent />
        </div>
        <div class="text">正在加载{{ text }}页面</div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

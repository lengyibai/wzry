<script setup lang="ts">
import { ref } from "vue";

import { AudioStore } from "@/store";
import { KDialog } from "@/components/business";
import { vScrollVirtualization } from "@/directives";
import { $bus } from "@/utils/eventBus";
import { _setHighlight } from "@/utils/tool";

const $audioStore = AudioStore();

/** 是否显示 */
const show = ref(false);
/** 弹窗标题 */
const title = ref("");
/** 弹窗内容 */
const content = ref("");

$bus.on("help", (v) => {
  show.value = true;
  title.value = v.title;
  content.value = v.content;

  $audioStore.play("u4c5");
});
</script>

<template>
  <teleport to="body">
    <KDialog
      v-if="show"
      v-model="show"
      width="57rem"
      ct-width="85%"
      ct-top="55%"
      z-index="var(--z-index-close-dialog)"
      :audio="false"
      :title="title"
    >
      <div v-scroll-virtualization class="content" v-html="_setHighlight(content)"></div>
    </KDialog>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

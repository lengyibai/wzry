<script setup lang="ts">
import { ref } from "vue";

import SelectHeroSkin from "./components/SelectHeroSkin/index.vue";
import { OptionalMode } from "./interface";

import { KDialog } from "@/components/business";
import { $bus } from "@/utils/eventBus";

/** 是否显示弹窗 */
const show = ref(false);
/** 弹窗模式 */
const mode = ref<OptionalMode>("HERO");

$bus.on("optional", (v: OptionalMode) => {
  mode.value = v;
  show.value = true;
});

/* 关闭领取弹窗 */
const onClose = () => {
  show.value = false;
};
</script>

<template>
  <teleport to="body">
    <KDialog
      v-if="show"
      ref="dialogRef"
      v-model="show"
      ct-width="90%"
      :ratio="0.7"
      width="60rem"
      ct-height="80%"
      ct-top="55%"
      z-index="var(--z-index-input-dialog)"
      audio
      up
      show-close
      :title="`选择一个${mode === 'HERO' ? '英雄' : '皮肤'}并领取`"
    >
      <div class="k-optional">
        <SelectHeroSkin :mode="mode" @close="onClose" />
      </div>
    </KDialog>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

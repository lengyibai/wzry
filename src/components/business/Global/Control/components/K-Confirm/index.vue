<script setup lang="ts">
import { ref } from "vue";

import { useConfirm } from "./hooks/useConfirm";

import { vDebounceClick, vMouseTip } from "@/directives";
import { KButton, KDialog } from "@/components/business";
import { _setHighlight } from "@/utils/tool";

const { show, config } = useConfirm();

const dialogRef = ref<InstanceType<typeof KDialog>>();

/** @description 取消 */
const handleCancel = () => {
  config.value.cancel && config.value.cancel();
  dialogRef.value!._close();
};

/** @description 确定 */
const handleConfirm = () => {
  config.value.confirm();
  dialogRef.value!._close();
};
</script>

<template>
  <teleport to="body">
    <KDialog
      v-if="show"
      ref="dialogRef"
      v-model="show"
      z-index="var(--z-index-close-dialog)"
      :audio="false"
      :ratio="0.6"
      :show-close="config.close"
    >
      <div class="k-confirm">
        <div class="content">
          <div class="text" v-html="_setHighlight(config.text)"></div>
        </div>
        <div class="button">
          <KButton
            v-if="config.close"
            v-mouse-tip
            class="k-button"
            type="info"
            @click="handleCancel"
          >
            取消
          </KButton>
          <KButton v-mouse-tip v-debounce-click="handleConfirm" class="k-button" type="warning">
            确定
          </KButton>
        </div>
      </div>
    </KDialog>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

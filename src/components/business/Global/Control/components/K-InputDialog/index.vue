<script setup lang="ts">
import { ref } from "vue";

import { useInput } from "./hooks/useInput";

import { KButton, KDialog } from "@/components/business";
import { vFocus, vMouseTip } from "@/directives";
import { MESSAGE_TIP } from "@/config";
import { $message } from "@/utils/busTransfer";
import { _debounce } from "@/utils/tool";

const { show, content, config } = useInput();

const dialogRef = ref<InstanceType<typeof KDialog>>();

/* 确定 */
const debounceConfirm = _debounce(
  () => {
    if (content.value === "") {
      $message(MESSAGE_TIP.cg09, "error");
      return;
    }
    config.value.confirm(content.value, () => {
      dialogRef.value?._close();
    });
  },
  1000,
  {
    leading: true,
    trailing: false,
  },
);

/* 关闭 */
const onClose = () => {
  content.value = "";
  config.value.close?.();
};
</script>

<template>
  <teleport to="body">
    <KDialog
      v-if="show"
      ref="dialogRef"
      v-model="show"
      z-index="var(--z-index-input-dialog)"
      audio
      show-close
      :title="config.title"
      @before-close="onClose"
    >
      <div class="k-input-dialog">
        <input
          v-model="content"
          v-focus
          v-mouse-tip="{
            text: '',
            type: 'INPUT',
          }"
          maxlength="6"
          type="text"
          :placeholder="config.placeholder"
          @keydown.enter="debounceConfirm"
        />
        <K-Button v-mouse-tip class="k-button" type="warning" @click="debounceConfirm">
          确定
        </K-Button>
      </div>
    </KDialog>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

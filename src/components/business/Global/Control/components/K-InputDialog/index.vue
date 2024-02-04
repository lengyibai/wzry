<script setup lang="ts">
import { ref } from "vue";

import type { InputConfig } from "./interface";

import { $bus, $message } from "@/utils";
import { KButton, KDialog } from "@/components/business";
import { vFocus, vMouseTip } from "@/directives";

const dialogRef = ref<InstanceType<typeof KDialog>>();

/** 是否显示 */
const show = ref(false);
const content = ref("");
/** 接收的配置 */
const config = ref<InputConfig>({
  value: "",
  title: "",
  placeholder: "",
  confirm() {},
  close() {},
});

$bus.on("input", (v) => {
  show.value = true;
  config.value = v;
  content.value = v.value || "";
});

/* 确定 */
const handleConfirm = () => {
  if (content.value === "") {
    $message("内容不能为空", "error");
    return;
  }
  config.value.confirm(content.value);
  dialogRef.value?._close();
};

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
      class="k-dialog"
      align="center"
      audio
      show-close
      :title="config.title"
      @before-close="onClose"
    >
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
        @keydown.enter="handleConfirm"
      />
      <K-Button v-mouse-tip class="k-button" type="warning" @click="handleConfirm">确定</K-Button>
    </KDialog>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

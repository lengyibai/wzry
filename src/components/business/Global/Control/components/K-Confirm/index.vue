<script setup lang="ts">
import { ref } from "vue";

import { ConfirmTip } from "./types";

import KButton from "@/components/business/Parts/K-Button/index.vue";
import KDialog from "@/components/business/Parts/K-Dialog/index.vue";
import { AudioStore } from "@/store";
import { $bus } from "@/utils";

const $audioStore = AudioStore();

const dialogRef = ref<InstanceType<typeof KDialog>>();

/** 是否显示 */
const show = ref(false);
/** 接收的配置 */
const config = ref<ConfirmTip>({
  text: "",
  close: true,
  confirm: () => {},
  cancel: () => {},
});

$bus.on("confirm", (v) => {
  show.value = true;
  config.value = v;
  $audioStore.play("cy87");
  config.value.close = v.close === undefined ? true : v.close;
});

/* 取消 */
const handleCancel = () => {
  config.value.cancel && config.value.cancel();
  dialogRef.value!.close();
};

/* 确定 */
const handleConfirm = () => {
  config.value.confirm();
  dialogRef.value!.close();
};
</script>

<template>
  <teleport to="body">
    <KDialog
      v-if="show"
      ref="dialogRef"
      v-model="show"
      class="k-dialog"
      align="center"
      :audio="false"
      :show-close="config.close"
    >
      <div class="text">{{ config.text }}</div>
      <div class="button">
        <KButton v-if="config.close" type="info" @click="handleCancel">取消</KButton>
        <KButton class="last" type="warning" @click="handleConfirm">确定</KButton>
      </div>
    </KDialog>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

<script setup lang="ts">
import { ref } from "vue";

import { ConfirmTip } from "./types";

import KButton from "@/components/business/Parts/K-Button/index.vue";
import KDialog from "@/components/business/Parts/K-Dialog/index.vue";
import { AudioStore } from "@/store";
import { $bus } from "@/utils";

const $audioStore = AudioStore();

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
  $audioStore.play("45iy");
  config.value.close = v.close === undefined ? true : v.close;
});

/* 关闭 */
const close = () => {
  show.value = false;
};

/* 取消 */
const handleCancel = () => {
  close();
  config.value.cancel && config.value.cancel();
  $audioStore.play("6xc6");
};

/* 确定 */
const handleConfirm = () => {
  close();
  config.value.confirm();
  $audioStore.play("36jn");
};
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <KDialog
        v-if="show"
        class="k-dialog"
        align="center"
        :show-close="config.close"
        @close="close"
      >
        <div class="text">{{ config.text }}</div>
        <div class="button">
          <KButton v-if="config.close" type="info" @click="handleCancel">取消</KButton>
          <KButton class="last" type="warning" @click="handleConfirm">确定</KButton>
        </div>
      </KDialog>
    </transition>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

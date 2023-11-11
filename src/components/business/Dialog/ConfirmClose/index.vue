<script setup lang="ts">
import KButton from "@/components/business/Parts/K-Button/index.vue";
import KDialog from "@/components/business/Parts/K-Dialog/index.vue";
import { AudioStore } from "@/store";

interface Props {
  /** 是否显示 */
  modelValue: boolean;
  /** 提示描述 */
  text?: string;
}

withDefaults(defineProps<Props>(), {
  text: "即将关闭，是否保存为草稿？",
});
const $emit = defineEmits<{
  cancel: [];
  confirm: [];
  "update:modelValue": [v: boolean];
}>();

const $audioStore = AudioStore();

$audioStore.play("45iy");

/* 关闭 */
const close = () => {
  $emit("update:modelValue", false);
};

/* 取消 */
const handleCancel = () => {
  $emit("cancel");
  close();
  $audioStore.play("6xc6");
};

/* 确定 */
const handleConfirm = () => {
  $emit("confirm");
  close();
  $audioStore.play("36jn");
};
</script>

<template>
  <KDialog align="center" @close="close">
    <div class="text">{{ text }}</div>
    <div class="button">
      <KButton type="info" @click="handleCancel">取消</KButton>
      <KButton class="last" type="warning" @click="handleConfirm">确定</KButton>
    </div>
  </KDialog>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

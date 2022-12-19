<template>
  <ManageMask class="content" :show="show">
    <transition-group name="fade"></transition-group>

    <!-- 发布相关 -->
    <ReleaseConfirm
      v-model:showConfirmclose="show_ConfirmClose"
      v-model:status="status"
      size="50px"
      :finish="finish"
      @commit="EmitCommit"
      @confirm="EmitConfirmSave"
      @cancel="EmitConfirmRemove"
      @close="EmitCancelRelease"
    />
  </ManageMask>
</template>
<script setup lang="ts">
import viewHide from "../../../../hooks/useViewHide";
import switchStore from "@/store/globalSwitch";

const $store = switchStore();

interface Emits {
  (e: "update:modelValue", v: boolean): void;
}
const emit = defineEmits<Emits>();

const { show, status, show_ConfirmClose, finish, EmitCancelRelease, EmitConfirmRemove, EmitConfirmSave } = viewHide(
  emit,
  "add_epigraph"
);

/* 延迟显示页面 */
setTimeout(async () => {
  $store.$loading.show("正在加载");
  await $store.$loading.close();
  show.value = true;
}, 1000);

/* 提交表单 */
const EmitCommit = () => {
  setTimeout(() => {
    finish.value = true;
    setTimeout(() => {
      close();
    }, 250);
  }, 250);
};
</script>

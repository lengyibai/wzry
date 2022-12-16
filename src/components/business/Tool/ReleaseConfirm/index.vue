<template>
  <div class="release-confirm">
    <!-- 取消发布 -->
    <LibCancelBtn class="lib-cancel-btn" v-bind="$attrs" title="取消" />

    <!-- 发布按钮 -->
    <LibCommitBtn class="lib-commit-btn" v-model="commit_status" v-bind="$attrs" title="发布" />

    <!-- 确认关闭 -->
    <ConfirmClose v-model="show_ConfirmClose" v-bind="$attrs" />
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";

interface Props {
  status: number; //提交状态
  finish: boolean; //是否完成提交
  showConfirmclose: boolean; // 是否显示确认关闭弹窗
}
const props = withDefaults(defineProps<Props>(), {
  status: 0,
  finish: false,
  showConfirmclose: false,
});

interface Emits {
  (e: "update:showConfirmclose", v: boolean): void;
  (e: "update:status", v: number): void;
}
const emit = defineEmits<Emits>();

const commit_status = ref(0); //提交状态
const show_ConfirmClose = ref(false); //是否显示确认关闭弹窗

watch(
  () => props.status,
  (v) => {
    console.log(v);

    commit_status.value = v;
  }
);

watch(commit_status, (v) => {
  console.log(v);

  emit("update:status", v);
});

watch(
  () => [props.showConfirmclose, show_ConfirmClose.value],
  (v) => {
    show_ConfirmClose.value = v[0];
    emit("update:showConfirmclose", v[1]);
  }
);
</script>
<style scoped lang="less">
@import url("./index.less");
</style>

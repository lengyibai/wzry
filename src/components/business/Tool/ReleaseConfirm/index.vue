<script setup lang="ts">
import { ref, watch } from "vue";

interface Props {
  status: number; //提交状态
  finish: boolean; //完成提交
}
const props = defineProps<Props>();

interface Emits {
  (e: "update:status", v: number): void;
  (e: "close"): void;
}
const emit = defineEmits<Emits>();

const commit_status = ref(0); //提交状态
const show_ConfirmClose = ref(false); //是否显示确认关闭弹窗

/* 关闭页面 */
const handleClose = () => {
  show_ConfirmClose.value = true;
};

watch(
  () => props.status,
  (v) => {
    commit_status.value = v;
  }
);

watch(commit_status, (v) => {
  emit("update:status", v);
});
</script>

<template>
  <div class="release-confirm">
    <!-- 取消发布 -->
    <i class="iconfont wzry-guanbi" title="取消" @click="handleClose"></i>

    <!-- 发布按钮 -->
    <K-Commit v-model="commit_status" class="lib-commit-btn" v-bind="$attrs" title="发布" />

    <!-- 确认关闭 -->
    <transition name="fade">
      <ConfirmClose v-if="show_ConfirmClose" v-model="show_ConfirmClose" v-bind="$attrs" />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

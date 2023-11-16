<script setup lang="ts">
import { ref, watch } from "vue";

import KCommit from "@/components/business/Parts/K-Commit/index.vue";
import { $bus } from "@/utils";

interface Props {
  /** 提交状态 */
  status: number;
  /** 完成提交 */
  finish: boolean;
}

const $props = defineProps<Props>();
const $emit = defineEmits<{
  "update:status": [v: number];
  confirm: [];
  cancel: [];
}>();

/** 提交状态 */
const commit_status = ref(0);

/* 关闭页面 */
const handleClose = () => {
  $bus.emit("confirm", {
    text: "即将关闭，是否保存为草稿？",
    confirm: () => {
      $emit("confirm");
    },
    cancel: () => {
      $emit("cancel");
    },
  });
};

watch(
  () => $props.status,
  (v) => {
    commit_status.value = v;
  },
);

watch(commit_status, (v) => {
  $emit("update:status", v);
});
</script>

<template>
  <div class="release-confirm">
    <!-- 取消发布 -->
    <i class="iconfont wzry-guanbi" title="取消" @click="handleClose"></i>

    <!-- 发布按钮 -->
    <KCommit v-model="commit_status" class="lib-commit-btn" v-bind="$attrs" title="发布" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

<script setup lang="ts">
import { ref } from "vue";

import { API_DATA } from "@/api";
import { KDialog } from "@/components/business";
import { vScrollVirtualization } from "@/directives";
import { _retryRequest } from "@/utils/tool";
import { $msgTipText } from "@/config";
import { $message } from "@/utils/busTransfer";

/** 公告富文本 */
const notice = ref("");
/** 是否处于加载中 */
const loading = ref(true);

_retryRequest({
  promiseFn: API_DATA.Notice,
})
  .then((res) => {
    notice.value = res.data;
  })
  .catch(() => {
    $message($msgTipText("rc53", { v: "系统公告" }), "error");
  })
  .finally(() => {
    loading.value = false;
  });
</script>

<template>
  <KDialog
    :loading="loading"
    v-bind="$attrs"
    width="56.25rem"
    header="系统公告"
    @close="loading = true"
  >
    <div v-scroll-virtualization class="notice" v-html="notice"></div>
  </KDialog>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

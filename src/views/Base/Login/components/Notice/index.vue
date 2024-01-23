<script setup lang="ts">
import { ref } from "vue";

import { API_DATA } from "@/api";
import { KDialog } from "@/components/business";

const notice = ref("");
const loading = ref(true);

API_DATA.Notice()
  .then((res) => {
    notice.value = res.data;
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
    <div class="notice" v-html="notice"></div>
  </KDialog>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

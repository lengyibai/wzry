<script setup lang="ts">
import { ref } from "vue";

import { API_DATA } from "@/api";
import { KDialog } from "@/components/business";

const notice = ref("");

API_DATA.Notice().then((res) => {
  notice.value = res.data;
});
</script>

<template>
  <KDialog v-bind="$attrs" width="56.25rem" header="系统公告">
    <div class="notice" v-html="notice"></div>
  </KDialog>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

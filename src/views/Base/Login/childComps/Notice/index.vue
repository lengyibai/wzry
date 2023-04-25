<script setup lang="ts">
import { ref } from "vue";

import { switchStore } from "@/store";
import { API_DATA } from "@/api";

const $switchStore = switchStore();

const notice = ref("");

API_DATA.Notice().then((res) => {
  notice.value = res.data;
});

$switchStore.$audioStore("u4c5");
</script>

<template>
  <K-Dialog v-bind="$attrs" width="56.25rem" header="系统公告">
    <div class="main" v-html="notice"></div>
  </K-Dialog>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

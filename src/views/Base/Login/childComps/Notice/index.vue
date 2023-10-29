<script setup lang="ts">
import { ref } from "vue";

import { API_DATA } from "@/api";
import { AudioStore } from "@/store";

const $audioStore = AudioStore();

const notice = ref("");

API_DATA.Notice().then((res) => {
  notice.value = res.data;
});

$audioStore.play("u4c5");
</script>

<template>
  <K-Dialog v-bind="$attrs" width="56.25rem" header="系统公告">
    <div class="notice" v-html="notice"></div>
  </K-Dialog>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

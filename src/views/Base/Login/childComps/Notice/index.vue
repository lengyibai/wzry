<script setup lang="ts">
import { ref } from "vue";

import switchStore from "@/store/switch";
import { Notice } from "@/api/main/data";

const $switchStore = switchStore();

const notice = ref("");

Notice().then((res) => {
  notice.value = res.data;
});

$switchStore.$clickAudio("u4c5");
</script>

<template>
  <K-Dialog v-bind="$attrs" width="900px" header="系统公告">
    <div class="main" v-html="notice"></div>
  </K-Dialog>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

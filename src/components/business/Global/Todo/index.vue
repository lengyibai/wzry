<script setup lang="ts">
import { ref } from "vue";

import { API_DATA } from "@/api";
import { AudioStore } from "@/store";
import { KDialog } from "@/components/business";

const $audioStore = AudioStore();

const todo = ref("");

API_DATA.Todo().then((res) => {
  todo.value = res.data;
});

$audioStore.play("u4c5");
</script>

<template>
  <KDialog v-bind="$attrs" width="56.25rem" header="网站计划清单">
    <div class="todo">
      <div class="content" v-html="todo"></div>
    </div>
  </KDialog>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

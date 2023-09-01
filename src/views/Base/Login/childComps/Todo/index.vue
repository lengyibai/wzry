<script setup lang="ts">
import { ref } from "vue";

import { API_DATA } from "@/api";
import { AudioStore } from "@/store";

const $audioStore = AudioStore();

const todo = ref("");

API_DATA.Todo().then((res) => {
  todo.value = res.data;
});

$audioStore.play("u4c5");
</script>

<template>
  <K-Dialog v-bind="$attrs" width="56.25rem" header="微信小程序">
    <div class="todo">
      <h1>商城系统</h1>
      <div class="content" v-html="todo"></div>
    </div>
  </K-Dialog>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>

<script setup lang="ts">
import { ref } from "vue";

import { Store } from "@/store";
import { API_DATA } from "@/api";

const $controlStore = Store.control();

const todo = ref("");

API_DATA.Todo().then((res) => {
  todo.value = res.data;
});

$controlStore.$audioStore("u4c5");
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
